
module.exports = {
    translateProgram,

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
    const idIndex = node["children"][0].node === "id" ? 0 : 1;
    const id = getnode(node['children'],'id')["value"];
    const valueNode = node["children"][1-idIndex]

    if (valueNode["node"] === "constant") {
        const rightOperand = valueNode["value"];
        const assemblyInstruction = `MOV eax, ${rightOperand}\nMOV |${id}|, eax`;
        assemblyCode.push(assemblyInstruction);
    } else if (valueNode["node"] === "binop") {
        binopStatement(valueNode, assemblyCode);
        let bigId = getnode(node['children'],'id')["value"];
        const assemblyInstruction = `MOV |${bigId}|, ebx`;
        assemblyCode.push(assemblyInstruction);
    }else if (valueNode["node"] === "id") {
        const rightOperand = '|'+valueNode["value"]+'|';
        const assemblyInstruction = `MOV eax, ${rightOperand}\nMOV |${id}|, eax`;
        assemblyCode.push(assemblyInstruction);
}}
function getnode(children,id){
  for (let node of children){
    if (node['node']==id){
      return node;
  }}

}

function translateWhileLoop(node, assemblyCode) {
  const condition = node["children"][0];
  const body = node["children"][1];

  const loopStartLabel = 'START_WHILE_' + generateLabel();
  const loopEndLabel = 'END_WHILE_' + generateLabel();

  assemblyCode.push(`${loopStartLabel}:`);

  if (condition["node"] === "test") {
    translateCondition(condition, loopEndLabel, assemblyCode);
  } 

  translateBody(body, assemblyCode);

  assemblyCode.push(`JUMP ${loopStartLabel}`);
  assemblyCode.push(`${loopEndLabel}:`);
}
function translateIfStatement(node, assemblyCode) {
    const condition =  getnode(node['children'],'test');
    const body = node["children"][1];
    const elseBody = node["children"][2];

    const elseLabel = 'ELSE_'+generateLabel();
    const endIfLabel = 'END_IF_'+generateLabel();

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
      let comparenode=condition["children"][0];
      let leftOperand = comparenode["children"][0];
      if (leftOperand['node'] == 'constant') {
          leftOperand = leftOperand['value'];
      } else if (leftOperand['node'] == 'id') {
          leftOperand = '|' + leftOperand['value'] + '|';
      }

      const operator =getnode(comparenode["children"],'op')['value'];
      let rightOperand = comparenode["children"][2];
      if (rightOperand['node'] == 'constant') {
          assemblyCode.push(`MOV ebx, ${rightOperand['value']}`);
      } else if (rightOperand['node'] == 'id') {
          assemblyCode.push(`MOV ebx, |${rightOperand['value']}|`);
      }else if (rightOperand['node']=='binop'){
        binopStatement(rightOperand,assemblyCode)
      }
      assemblyCode.push(`MOV eax, ${leftOperand}`);
      assemblyCode.push(`CMP eax, ebx`);
      assemblyCode.push(`JUMP_IF_NOT_${getJumpInstruction(operator)} ${jumpLabel}`);
      
  
  }
function binopStatement(node, assemblyCode) {
  var binop_counter=0;
  for (let subnode of node['children'] ){
    // console.log(counter['node'])
    if (subnode['node']=='binop'){
      binop_counter++;

    }
    
  }

  if(binop_counter==0){ //1er cas de binop simple
  let op2 = getnode(node['children'],'op')["value"];
  let bop2 = getOperator(op2);
  let filtred=node['children'].filter(item => item['node'] !== 'op');
  let smallId = filtred[0];
  if (smallId['node']=='constant'){
    smallId=smallId['value']
  }else if(smallId['node']=='id'){
    smallId='|'+smallId['value']+'|'
  }
  let right = filtred[1]; 
  if (right['node']=='constant'){
    right=right['value']
  }else if(right['node']=='id'){
    right='|'+right['value']+'|'
  }
  const assemblyInstruction=`MOV ebx, ${smallId}\nMOV eax, ${right}\n${bop2} ebx, eax`;
  assemblyCode.push(assemblyInstruction);

}
else if(binop_counter==1)  { //2eme cas de binop imbriqué 
  let op2 = getnode(node['children'],'op')["value"];
  let bop2 = getOperator(op2);
  let filtred=node['children'].filter(item => item['node'] !== 'op'&&item['node'] !== 'binop');
  if (filtred[0]['node']=='id'){
  var bigId= '|'+filtred[0]['value']+'|'
}else if (filtred[0]['node']=='constant'){
  var bigId=  filtred[0]['value'];
}
  let binode=getnode(node['children'],'binop');
    binopStatement(binode, assemblyCode);
    const assemblyInstruction = `MOV eax, ebx\nMOV ebx, ${bigId}\n${bop2} ebx, eax`;
    assemblyCode.push(assemblyInstruction);
}else if(binop_counter==2){
  let op = getnode(node['children'],'op')["value"];
  let bop = getOperator(op);
  let filtred=node['children'].filter(item => item['node'] !== 'op');
  let binode1=filtred[0];
  let binode2=filtred[1];
  binopStatement(binode1, assemblyCode);
  assemblyCode.push(`MOV ecx, ebx`);
  binopStatement(binode2, assemblyCode);
  assemblyCode.push(`${bop} ebx, ecx`);



}
}
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
