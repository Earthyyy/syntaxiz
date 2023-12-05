
module.exports = {
    translateProgram,
    translateBody,
    translateStatement,
};
function translateProgram(tree, assemblyCode) {
    translateBody(tree, assemblyCode);
}
function translateBody(nodes, assemblyCode) {
  let childs=nodes["children"]
  
  const nodeValues = Object.values(childs);
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
      }
      // Add more cases for other statement types if needed
  }
}
function translateAssignment(node, assemblyCode) {
    const id = node["children"][0]["value"];
    const valueNode = node["children"][1];

    if (valueNode["node"] === "constant") {
        const rightOperand = valueNode["value"];
        assign(id,rightOperand,assemblyCode);
    } else if (valueNode["node"] === "binop") {
        binopStatement(valueNode, assemblyCode);
        let bigId = node['children'][0]['value'];
        const assemblyInstruction = `MOV |${bigId}|, ebx`;
        assemblyCode.push(assemblyInstruction);
    }else if (valueNode["node"] === "id") {
        const rightOperand = '|'+valueNode["value"]+'|';
        assign(id,rightOperand,assemblyCode);
}}
function assign(id,cst,assemblyCode){
    const assemblyInstruction = `MOV eax, ${cst}\nMOV |${id}|, eax`;
    assemblyCode.push(assemblyInstruction);
}
function translateWhileLoop(node, assemblyCode) {
  const condition = node["children"][0];
  const body = node["children"][1];

  const loopStartLabel = 'WHILE_' + generateLabel();
  const loopEndLabel = 'WHILE_' + generateLabel();

  assemblyCode.push(`${loopStartLabel}:`);

  if (condition["node"] === "test") {
    translateCondition(condition, loopEndLabel, assemblyCode);
  } 

  translateBody(body, assemblyCode);

  assemblyCode.push(`JUMP ${loopStartLabel}`);
  assemblyCode.push(`${loopEndLabel}:`);
}
function translateIfStatement(node, assemblyCode) {
    const condition = node["children"][0];
    const body = node["children"][1];
    const elseBody = node["children"][2];

    const elseLabel = 'IF_'+generateLabel();
    const endIfLabel = 'IF_'+generateLabel();

    translateCondition(condition, elseLabel, assemblyCode);
    translateBody(body, assemblyCode);

    assemblyCode.push(`JUMP ${endIfLabel}`);
    assemblyCode.push(`${elseLabel}:`);

    if (elseBody) {
        translateBody(elseBody, assemblyCode);
    }

    assemblyCode.push(`${endIfLabel}:`);
}
function translateCondition(condition, jumpLabel, assemblyCode) {
  if (condition["children"][0]["node"]=='compare'){
      let comparenode=condition["children"][0];
      let leftOperand = comparenode["children"][0];
      if (leftOperand['node'] == 'constant') {
          leftOperand = leftOperand['value'];
      } else if (leftOperand['node'] == 'id') {
          leftOperand = '|' + leftOperand['value'] + '|';
      }

      const operator = comparenode["children"][1]['value'];

      let rightOperand = comparenode["children"][2];
      if (rightOperand['node'] == 'constant') {
          rightOperand = rightOperand['value'];
      } else if (rightOperand['node'] == 'id') {
          rightOperand = '|' + rightOperand['value'] + '|';
      }

      assemblyCode.push(`MOV eax, ${leftOperand}\nMOV ebx, ${rightOperand}\nCMP eax, ebx`);
      assemblyCode.push(`JUMP_IF_NOT_${getJumpInstruction(operator)} ${jumpLabel}`);
  
  }
}

function binopStatement(node, assemblyCode) {
  
  if(node["children"][2]["node"]!=="binop"){ //2eme cas de binop simple
  let smallId = node['children'][0]["value"];
  let op2 = node["children"][1]["value"];
  let bop2 = getOperator(op2);
  let right = node['children'][2];
  if (right['node']=='constant'){
    right=right['value']
  }else if(right['node']=='id'){
    right='|'+right['value']+'|'
  }
  assemblyInstruction=`MOV ebx, |${smallId}|\nMOV eax, ${right}\n${bop2} ebx, eax`;
  assemblyCode.push(assemblyInstruction);

}
else if (node["children"][2]["node"]=="binop") { //3eme cas de binop imbriqué 
    let bigId = node['children'][0]['value'];
    let op2 = node["children"][1]["value"];
    let bop2 = getOperator(op2);
    binopStatement(node["children"][2], assemblyCode);
    const assemblyInstruction = `MOV eax, ebx\nMOV ebx, |${bigId}|\n${bop2} ebx, eax`;
    assemblyCode.push(assemblyInstruction);
}else{  //1er cas de recursion du 3eme cas
    let bigId = node['children'][0]['value'];
    let op1=node["children"][1]["value"];
    let bop1 = getOperator(op1);
    let binNode = node['children'][2];
    let smallId = binNode['children'][0]["value"];
    let op2 = binNode["children"][1]["value"];
    let bop2 = getOperator(op2);
    let right = binNode['children'][2];
    if (right["node"]=='binop') {
        binopStatement(binNode, assemblyCode);
        assemblyInstruction=`MOV eax, ebx \nMov ebx, |${bigId}|\n${bop} ebx, eax `;
        assemblyCode.push(assemblyInstruction);
  
  } else if (['constant','id'].includes(right["node"])) {
    right = right['value'];
    assemblyInstruction=`MOV eax, |${smallId}|\nMOV ebx, |${right}|\n${bop2} eax, ebx\nMOV ebx,|${bigId}|\n${bop1} ebx, eax `;
    assemblyCode.push(assemblyInstruction);
    
  } 
  }}
function getOperator(operator) {
  // Map your custom condition to x86 assembly jump instruction
  let ops = {
      "+": "add",
      "-": "sub",
      "*": "imul",
      "/": "idiv",
      // Add more mappings as needed
  }[operator];
  return ops;
}
function getJumpInstruction(operator) {
  // Map your custom condition to x86 assembly jump instruction
  const jumpInstruction = {
      "<": "LESS",
      ">": "GREATER",
      "==": "EQUALS",
      "<=": "LESS_OR_EQUAL",
      ">=": "GREATER_OR_EQUAL",
      "!=": "NOT_EQUAL",
      "&&": "AND",
      "||": "OR",
      "and": "AND",
      "or": "OR",

      // Add more mappings as needed
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
