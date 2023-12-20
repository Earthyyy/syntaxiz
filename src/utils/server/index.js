
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
      }else if (nodeType === "for") {
        translateForLoop(node, assemblyCode);
    }
  }
}
function translateAssignment(node, assemblyCode) {
  const id = getNode(node['children'],'id')["value"]; 
  const idIndex = node["children"][0].node === "id" ? 0 : 1; 
  const valueNode = node["children"][1-idIndex] 
  moveValueIntoRegister(valueNode,'ebx',assemblyCode)

  //assignement 
  const assemblyInstruction = `MOV [${id}], ebx`; 
  assemblyCode.push(assemblyInstruction);
}
function translateIfStatement(node, assemblyCode) {
    const condition =  getNode(node['children'],'test');
    const body = node["children"][1];
    const elseBody = node["children"][2];


    const elseLabel = 'ELSE_'+generateLabel();
    const endIfLabel = 'END_IF_'+generateLabel();


    translateCondition(condition, elseBody ? elseLabel : endIfLabel, assemblyCode);
    translateBody(body, assemblyCode);
    assemblyCode.push(`JUMP ${endIfLabel}`);
    if (elseBody) {
      assemblyCode.push(`${elseLabel}:`);
      translateBody(elseBody, assemblyCode);
    }
    assemblyCode.push(`${endIfLabel}:`);
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
function translateForLoop(node,assemblyCode){
    const iter = getNode(node["children"],'iter');
    const body = getNode(node['children'],'body');
    const id = getNode(iter['children'],'id')['value'];
    let start= getNode(iter['children'],'start')['children'][0];
    let end= getNode(iter['children'],'end')['children'][0];
  
  
    if (start['node']=='id'){
      start='['+start['value']+']'
    }else if (start['node']=='constant'){
      start=start['value']
    }
    if (end['node']=='id'){
      end='['+end['value']+']'
    }else if (end['node']=='constant'){
      end=end['value']
    }
  
  
    const loopStartLabel = 'START_FOR_' + generateLabel();
    const loopEndLabel = 'END_FOR_' + generateLabel();
  
  
    assemblyCode.push(`MOV eax, ${start}\nMOV [start], eax`);
    assemblyCode.push(`${loopStartLabel}:`);
    assemblyCode.push(`MOV eax, [start]\nMOV ebx, ${end}\nCMP eax, ebx\nJUMP_IF_NOT_LESS ${loopEndLabel} `);
    translateBody(body,assemblyCode)
    assemblyCode.push(`MOV eax, [start]\nADD eax, 1\nMOV [start], eax\nJUMP ${loopStartLabel}\n${loopEndLabel} `);
}
function translateCondition(condition, jumpLabel, assemblyCode) {
        let comparenode=condition["children"][0];
        const operator =getNode(comparenode["children"],'op')['value'];
        const rightOperand = comparenode["children"][2];
        const leftOperand = comparenode["children"][0];   
  
  
        moveValueIntoRegister(rightOperand,'ebx',assemblyCode)
        moveValueIntoRegister(leftOperand,'eax',assemblyCode)
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
  let op2 = getNode(node['children'],'op')["value"];
  let bop2 = getOperator(op2);
  let filtred=node['children'].filter(item => item['node'] !== 'op');
  let smallId = filtred[0];
  moveValueIntoRegister(smallId,'ebx',assemblyCode)
  let right = filtred[1]; 
  if (right['node']=='constant'){
    right=right['value']
  }else if(right['node']=='id'){
    right='['+right['value']+']'
  }
  moveValueIntoRegister(right,'eax',assemblyCode)
  const assemblyInstruction=`${bop2} ebx, eax`;
  assemblyCode.push(assemblyInstruction);

}
else if(binop_counter==1)  { //2eme cas de binop imbriqué 
  let op2 = getNode(node['children'],'op')["value"];
  let bop2 = getOperator(op2);
  let filtred=node['children'].filter(item => item['node'] !== 'op'&&item['node'] !== 'binop');
  if (filtred[0]['node']=='id'){
  var bigId= '['+filtred[0]['value']+']'
}else if (filtred[0]['node']=='constant'){
  var bigId=  filtred[0]['value'];
}
  let binode=getNode(node['children'],'binop');
    binopStatement(binode, assemblyCode);
    const assemblyInstruction = `MOV eax, ebx\nMOV ebx, ${bigId}\n${bop2} ebx, eax`;
    assemblyCode.push(assemblyInstruction);
}else if(binop_counter==2){
  let op = getNode(node['children'],'op')["value"];
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
function moveValueIntoRegister(node,register,assemblyCode){ 
  if (node["node"] === "constant") {
    const Operand = node["value"];
    assemblyCode.push(`MOV ${register}, ${Operand}`);

  }else if (node["node"] === "binop") {
    binopStatement(node, assemblyCode);
    if(register=='eax'){
      assemblyCode.push(`MOV eax, ebx`);
    }

    }else if (node["node"] === "id") {
    const Operand = '['+node["value"]+']';
    assemblyCode.push(`MOV ${register}, ${Operand}`);
}
}
function getNode(children,type){
  for (let node of children){
    if (node['node']==type){
      return node;
  }}
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
      "and": "AND",
      "or": "OR",

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