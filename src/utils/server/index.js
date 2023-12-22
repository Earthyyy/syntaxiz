module.exports = {
  translateProgram,
};
function translateProgram(tree, assemblyCode) {
  translateBody(tree, assemblyCode);
}
function translateBody(nodes, assemblyCode) {
  let children = nodes["children"];
  const nodeValues = Object.values(children);

  for (let node of nodeValues) {
    translateStatement(node, assemblyCode);
  }
}
function translateStatement(node, assemblyCode) {
  if (node && node["node"]) {
    const nodeType = node["node"];

    if (nodeType === "assign") {
      translateAssignment(node, assemblyCode);
    } else if (nodeType === "while") {
      translateWhileLoop(node, assemblyCode);
    } else if (nodeType === "if") {
      translateIfStatement(node, assemblyCode);
    } else if (nodeType === "for") {
      translateForLoop(node, assemblyCode);
    }
  }
}
function translateAssignment(node, assemblyCode) {
  const id = getNode(node["children"], "id")["value"];
  const idIndex = node["children"][0].node === "id" ? 0 : 1;
  const valueNode = node["children"][1 - idIndex];
  moveValueIntoRegister(valueNode, "ebx", assemblyCode);

  //assignement
  const assemblyInstruction = `MOV [${id}], ebx`;
  assemblyCode.push(assemblyInstruction);
}
function translateIfStatement(node, assemblyCode) {
  const condition = getNode(node["children"], "test");
  const body = node["children"][1];
  const elseBody = node["children"][2];

  const elseLabel = "ELSE_" + generateLabel();
  const endIfLabel = "END_IF_" + generateLabel();

  translateCondition(
    condition["children"][0],
    elseBody ? elseLabel : endIfLabel,
    "false",
    assemblyCode
  );
  translateBody(body, assemblyCode);
  if (elseBody) {
    assemblyCode.push(`JUMP ${endIfLabel}`);
    assemblyCode.push(`${elseLabel}:`);
    translateBody(elseBody, assemblyCode);
  }
  assemblyCode.push(`${endIfLabel}:`);
}
function translateWhileLoop(node, assemblyCode) {
  const condition = node["children"][0];
  const body = node["children"][1];

  const loopStartLabel = "START_WHILE_" + generateLabel();
  const loopEndLabel = "END_WHILE_" + generateLabel();

  assemblyCode.push(`${loopStartLabel}:`);
  translateCondition(
    condition["children"][0],
    loopEndLabel,
    "false",
    assemblyCode
  );

  translateBody(body, assemblyCode);
  assemblyCode.push(`JUMP ${loopStartLabel}`);
  assemblyCode.push(`${loopEndLabel}:`);
}
function translateForLoop(node, assemblyCode) {
  const iter = getNode(node["children"], "iter");
  const body = getNode(node["children"], "body");
  const id = getNode(iter["children"], "id")["value"];
  let start = getNode(iter["children"], "start")["children"][0];
  let end = getNode(iter["children"], "end")["children"][0];

  const loopStartLabel = "START_FOR_" + generateLabel();
  const loopEndLabel = "END_FOR_" + generateLabel();

  moveValueIntoRegister(start, "edx", assemblyCode);
  assemblyCode.push(`MOV [${id}], edx`);
  assemblyCode.push(`${loopStartLabel}:`);
  assemblyCode.push(`MOV edx, [${id}]`);
  moveValueIntoRegister(end, "ebx", assemblyCode);
  assemblyCode.push(`CMP edx, ebx`);
  assemblyCode.push(`JUMP_IF_NOT_LESS ${loopEndLabel} `);
  translateBody(body, assemblyCode);
  assemblyCode.push(`MOV edx, [${id}]`);
  assemblyCode.push(`ADD edx, 1`);
  assemblyCode.push(`MOV [${id}], edx`);
  assemblyCode.push(`JUMP ${loopStartLabel}`);
  assemblyCode.push(`${loopEndLabel}: `);
}
function translateCompareCondition(
  condition,
  jumpLabel,
  jumpmode,
  assemblyCode
) {
  const operator = getNode(condition["children"], "op")["value"];
  const rightOperand = condition["children"][2];
  const leftOperand = condition["children"][0];

  moveValueIntoRegister(leftOperand, "edx", assemblyCode);
  moveValueIntoRegister(rightOperand, "ebx", assemblyCode);
  assemblyCode.push(`CMP edx, ebx`);

  if (jumpmode == "false") {
    assemblyCode.push(
      `JUMP_IF_NOT_${getJumpInstruction(operator)} ${jumpLabel}`
    );
  } else if (jumpmode == "true") {
    assemblyCode.push(`JUMP_IF_${getJumpInstruction(operator)} ${jumpLabel}`);
  }
}
function translateBoolopCondition(
  condition,
  jumpLabel,
  jumpmode,
  assemblyCode
) {
  const boolOperator = getNode(condition["children"], "op")["value"];
  if (boolOperator == "and") {
    translateCondition(
      condition["children"][0],
      jumpLabel,
      "false",
      assemblyCode
    );
    translateCondition(
      condition["children"][2],
      jumpLabel,
      "false",
      assemblyCode
    );
  } else if (boolOperator == "or") {
    let jumpIfTrueLabel = generateLabel() + "_TRUE";

    translateCondition(
      condition["children"][0],
      jumpIfTrueLabel,
      "true",
      assemblyCode
    );
    translateCondition(
      condition["children"][2],
      jumpIfTrueLabel,
      "true",
      assemblyCode
    );

    assemblyCode.push(`JUMP ${jumpLabel}`);
    assemblyCode.push(`${jumpIfTrueLabel}:`);
  }
}
function translateCondition(condition, jumpLabel, jumpmode, assemblyCode) {
  if (condition["node"] == "compare") {
    translateCompareCondition(condition, jumpLabel, jumpmode, assemblyCode);
  } else if (condition["node"] == "boolop") {
    translateBoolopCondition(condition, jumpLabel, jumpmode, assemblyCode);
  }
}
function binopStatement(node, assemblyCode) {
  var binop_counter = 0;
  for (let subnode of node["children"]) {
    if (subnode["node"] == "binop") {
      binop_counter++;
    }
  }

  if (binop_counter == 0) {
    //1er cas de binop simple
    let bop = getOperator(getNode(node["children"], "op")["value"]);
    let filtred = node["children"].filter((item) => item["node"] !== "op");
    let left = filtred[0];
    moveValueIntoRegister(left, "ebx", assemblyCode);
    let right = filtred[1];
    moveValueIntoRegister(right, "eax", assemblyCode);
    const assemblyInstruction = `${bop} ebx, eax`;
    assemblyCode.push(assemblyInstruction);
  } else if (binop_counter == 1) {
    //2eme cas de binop imbriqué
    let bop = getOperator(getNode(node["children"], "op")["value"]);
    let filtred = node["children"].filter((item) => item["node"] !== "op");
    let operand1 = filtred[0];
    let operand2 = filtred[1];
    if (operand1["node"] == "binop") {
      moveValueIntoRegister(operand1, "ebx", assemblyCode);
      moveValueIntoRegister(operand2, "eax", assemblyCode);
    } else {
      moveValueIntoRegister(operand2, "eax", assemblyCode);
      moveValueIntoRegister(operand1, "ebx", assemblyCode);
    }
    assemblyCode.push(`${bop} ebx, eax`);
  } else if (binop_counter == 2) {
    let bop = getOperator(getNode(node["children"], "op")["value"]);
    let filtred = node["children"].filter((item) => item["node"] !== "op");
    let binode1 = filtred[0];
    let binode2 = filtred[1];
    binopStatement(binode2, assemblyCode);
    assemblyCode.push(`MOV ecx, ebx`);
    binopStatement(binode1, assemblyCode);
    assemblyCode.push(`${bop} ebx, ecx`);
  }
}
function moveValueIntoRegister(node, register, assemblyCode) {
  if (node["node"] === "constant") {
    const Operand = node["value"];
    assemblyCode.push(`MOV ${register}, ${Operand}`);
  } else if (node["node"] === "binop") {
    binopStatement(node, assemblyCode);
    if (register !== "ebx") {
      assemblyCode.push(`MOV ${register}, ebx`);
    }
  } else if (node["node"] === "id") {
    const Operand = "[" + node["value"] + "]";
    assemblyCode.push(`MOV ${register}, ${Operand}`);
  }
}
function getNode(children, type) {
  for (let node of children) {
    if (node["node"] == type) {
      return node;
    }
  }
}
function getOperator(operator) {
  let ops = {
    "+": "add",
    "-": "sub",
    "*": "imul",
    "/": "idiv",
  }[operator];
  return ops;
}
function getJumpInstruction(operator) {
  const jumpInstruction = {
    "<": "LESS",
    ">": "GREATER",
    "==": "EQUALS",
    "<=": "LESS_OR_EQUAL",
    ">=": "GREATER_OR_EQUAL",
    "!=": "NOT_EQUAL",
    "&&": "AND",
    "||": "OR",
    and: "AND",
    or: "OR",
  }[operator];
  return jumpInstruction;
}
function generateLabel() {
  if (!generateLabel.counter) {
    generateLabel.counter = 1;
  } else {
    generateLabel.counter++;
  }

  return `LABEL_${generateLabel.counter}`;
}
