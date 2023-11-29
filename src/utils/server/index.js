function translateProgram(tree, assemblyCode) {
    translateBody(tree["body"], assemblyCode);
}

function translateBody(node, assemblyCode) {
    for (let key in node) {
        if (key !== "noeud") {
            translateStatement(node[key], assemblyCode);
        }
    }
}

function translateStatement(node, assemblyCode) {
    if (node["noeud"] === "Assignment") {
        translateAssignment(node, assemblyCode);
    } else if (node["noeud"] === "while") {
        translateWhileLoop(node, assemblyCode);
    } else if (node["noeud"] === "if") {
        translateIfStatement(node, assemblyCode);
    } else if (node["noeud"] === "body") {
        translateBody(node, assemblyCode);
    } else if (node["noeud"] === "for") {
        translateForLoop(node, assemblyCode);
    }
}

function translateAssignment(node, assemblyCode) {
    let id = node["id"];
    if ('cst' in node) {
        let rightOperand = node['cst'];
        let assemblyInstruction = `MOV ${id}, ${rightOperand}`;
        assemblyCode.push(assemblyInstruction);
    } else if ('binop' in node) {
        binopStatement(node, assemblyCode);
    }
}

function binopStatement(node, assemblyCode) {
    let bigId = node['id'];
    let binNode = node['binop'];
    let smallId = binNode['id'];
    let op2 = binNode['op'];
    let bop2 = getOperator(op2);

    if ('binop' in binNode) {
        binopStatement(node['binop'], assemblyCode);
    } else if ('cst' in binNode) {
        let right = binNode['cst'];
        let assemblyInstruction = `${bop2} ${smallId}, ${right}`;
        assemblyCode.push(assemblyInstruction);
    } else if ('id2' in binNode) {
        let right = binNode['id2'];
        let assemblyInstruction = `${bop2} ${smallId}, ${right}`;
        assemblyCode.push(assemblyInstruction);
    }
    if (!('op' in node)) {
        let assemblyInstruction = `MOV ${bigId}, ${smallId}`;
        assemblyCode.push(assemblyInstruction);
    } else if ('op' in node) {
        let op1 = node['op'];
        let bop1 = getOperator(op1);
        let assemblyInstruction = `${bop1} ${bigId}, ${smallId}`;
        assemblyCode.push(assemblyInstruction);
    }
}

function translateWhileLoop(node, assemblyCode) {
    let condition = node["condition_while"];
    assemblyCode.push("LOOP_WHILE_START_LABEL:");
    translateConditionWhile(condition, assemblyCode);
    translateBody(node["body"], assemblyCode);
    assemblyCode.push("JUMP LOOP_START_LABEL");
    assemblyCode.push("LOOP_WHILE_END_LABEL:");
}

function translateForLoop(node, assemblyCode) {
    let condition = node["condition_for"];
    let left = parseInt(condition["left"]);
    assemblyCode.push(`elx , ${left}`);
    assemblyCode.push("LOOP_FOR_START_LABEL:");
    translateConditionFor(condition, assemblyCode);
    translateBody(node["body"], assemblyCode);
    assemblyCode.push("MOVE elx,elx + 1");
    assemblyCode.push("JUMP LOOP_FOR_START_LABEL");
    assemblyCode.push("LOOP_FOR_END_LABEL:");
}

function translateIfStatement(node, assemblyCode) {
    let condition = node["condition_if"];
    translateConditionIf(condition, assemblyCode);
    translateBody(node["body"], assemblyCode);
    assemblyCode.push("JUMP END_IF_LABEL");
    assemblyCode.push("ELSE_LABEL:");
    if ("else_body" in node) {
        translateBody(node["else_body"], assemblyCode);
    }
    assemblyCode.push("END_IF_LABEL:");
}

function getJumpInstruction(operator) {
    // Map your custom condition to x86 assembly jump instruction
    let jumpInstruction = {
        "<": "LESS",
        ">": "GREATER",
        "==": "EQUALS",
        // Add more mappings as needed
    }[operator];
    return jumpInstruction;
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

function translateConditionIf(node, assemblyCode) {
    let test = node["test"];
    let right = node["right"];
    let operator = node["noeud"];
    let jumpInstruction = getJumpInstruction(operator);
    //I should add more i think  
    assemblyCode.push(`COMPARE ${test}, ${right}`);
    assemblyCode.push(`JUMP_IF_NOT_${jumpInstruction}   ELSE_LABEL`);
}

function translateConditionWhile(node, assemblyCode) {
    let test = node["test"];
    let right = node["right"];
    let operator = node["noeud"];
    let jumpInstruction = getJumpInstruction(operator);
    //I should add more i think    
    assemblyCode.push(`COMPARE ${test}, ${right}`);
    assemblyCode.push(`JUMP_IF_NOT_${jumpInstruction}   LOOP_WHILE_END_LABEL`);
}

function translateConditionFor(node, assemblyCode) {
    let left = node["left"];
    let right = node["right"];
    let variable = node["variable"];
    //I should add more i think    
    assemblyCode.push(`MOVE ${variable}, elx`);
    assemblyCode.push(`COMPARE ${left}, ${right}`);
    assemblyCode.push("JUMP_IF_NOT_LESS   LOOP_FOR_END_LABEL");
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        translateProgram,
        translateBody,
        translateStatement,
        translateAssignment,
        binopStatement,
        translateWhileLoop,
        translateForLoop,
        translateIfStatement,
        getJumpInstruction,
        getOperator,
        translateConditionIf,
        translateConditionWhile,
        translateConditionFor
    };
}

// Example usage
const syntaxTree = {
    "noeud": "body",
    "body": {
        "1": {
            "noeud": "Assignment",
            "id": "a",
            "cst": "5"
        },
        "2": {
            "noeud": "while",
            "condition_while": {
                "noeud": ">",
                "test": "x",
                "right": "5"
            },
            "body": {
                "noeud": "body",
                "1": {
                    "noeud": "Assignment",
                    "id": "y",
                    "cst": "3"
                },
                "2": {
                    "noeud": "if",
                    "condition_if": {
                        "noeud": ">",
                        "test": "y",
                        "right": "4"
                    },
                    "body": {
                        "noeud": "body",
                        "1": {
                            "noeud": "Assignment",
                            "id": "z",
                            "binop": {
                                "id": "b",
                                "op": "/",
                                "binop": {
                                    "id": "a",
                                    "op": "*",
                                    "binop": {
                                        "id": "c",
                                        "op": "+",
                                        "id2": "1"
                                    }
                                }
                            }
                        },
                        "2": {
                            "noeud": "Assignment",
                            "id": "t",
                            "binop": {
                                "id": "z",
                                "op": "*",
                                "id2": "m"
                            }
                        }
                    },
                    "else_body": {
                        "noeud": "body",
                        "1": {
                            "noeud": "Assignment",
                            "id": "w",
                            "cst": "10"
                        }
                    }
                }
            }
        },
        "3": {
            "noeud": "for",
            "condition_for": {
                "variable": "i",
                "left": "5",
                "right": "10"
            },
            "body": {
                "noeud": "body",
                "1": {
                    "noeud": "Assignment",
                    "id": "t",
                    "binop": {
                        "id": "i",
                        "op": "*",
                        "cst": "5"
                    }
                }
            }
        }
    }
};

const assemblyCode = [];

translateProgram(syntaxTree, assemblyCode);

for (let line of assemblyCode) {
    console.log(line);
}
