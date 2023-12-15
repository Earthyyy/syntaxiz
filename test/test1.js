const { expect } = require('chai');
const { translateProgram } = require('../src/utils/server/index'); 

describe('translateProgram', () => {
  it('should correctly translate a syntax tree to assembly code', () => {
    const syntaxTree = {
      "node": "body",
      "children": [
          {
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "a",
                  "children":null
                },
                {
                  "node": "constant",
                  "value": 50,
                  "children": null
                }
              ]
            }, {
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "d",
                  "children":null
                },
                {
                  "node": "id",
                  "value":'e',
                  "children": null
                }
              ]
            },
            {
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "t",
                  "children":null
                },
                {
                  "node": "binop",
                  "value": null,
                  "children": [
                    
                        { "node": "id", "value": "b", "children": null },
                        { "node": "op", "value": "*", "children": null },
                        { "node": "constant", "value": 10, "children": null }
                      
                  ]
                }
              ]
            },
            {
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "x",
                  "children":null
                },
                {
                  "node": "binop",
                  "value": null,
                  "children": [
                    
                        { "node": "id", "value": "b", "children": null },
                        { "node": "op", "value": "/", "children": null },
                        {
                          "node": "binop",
                          "value": null,
                          "children": [
                            
                                { "node": "id", "value": "a", "children": null },
                                { "node": "op", "value": "*", "children": null },
                                { "node": "constant", "value": "r", "children": null },
      
                              
                          ]
                        }
                      
                  ]
                }
              ]
            },{
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "x",
                  "children":null
                },
                {
                  "node": "binop",
                  "value": null,
                  "children": [
                    
                        { "node": "id", "value": "b", "children": null },
                        { "node": "op", "value": "/", "children": null },
                        {
                          "node": "binop",
                          "value": null,
                          "children": [
                            
                                { "node": "id", "value": "a", "children": null },
                                { "node": "op", "value": "*", "children": null },
                                {
                                  "node": "binop",
                                  "value": null,
                                  "children": [
                                    
                                        { "node": "id", "value": "r", "children": null },
                                        { "node": "op", "value": "+", "children": null },
                                        { "node": "constant", "value": "1", "children": null },
              
                                      
                                  ]
                                },
      
                              
                          ]
                        }
                      
                  ]
                }
              ]
            },{
              "node": "assign",
              "value": null,
              "children": [
                {
                  "node": "id",
                  "value": "x",
                  "children":null
                },
                {
                  "node": "binop",
                  "value": null,
                  "children": [
                    
                        { "node": "id", "value": "b", "children": null },
                        { "node": "op", "value": "/", "children": null },
                        {
                          "node": "binop",
                          "value": null,
                          "children": [
                            
                                { "node": "id", "value": "a", "children": null },
                                { "node": "op", "value": "*", "children": null },
                                {
                                  "node": "binop",
                                  "value": null,
                                  "children": [
                                    
                                        { "node": "id", "value": "r", "children": null },
                                        { "node": "op", "value": "+", "children": null },
                                        {
                                          "node": "binop",
                                          "value": null,
                                          "children": [
                                            
                                                { "node": "id", "value": "a", "children": null },
                                                { "node": "op", "value": "*", "children": null },
                                                { "node": "constant", "value": "1", "children": null },
                      
                                              
                                          ]
                                        },
              
                                      
                                  ]
                                },
      
                              
                          ]
                        }
                      
                  ]
                }
              ]
            }, {
              "node": "while",
              "value": null,
              "children": [
                {
                  "node": "test",
                  "value": null,
                  "children": [
                    {
                      "node": "compare",
                      "value": null,
                      "children": [
                        { "node": "id", "value": "whilevar", "children": null },
                        { "node": "op", "value": "<=", "children": null },
                        { "node": "constant", "value": "50", "children": null }
                      ]
                    }
                  ]
                },
                {
                  "node": "body",
                  "children": [
                    {
                      "node": "if",
                      "value":null,
                      "children": [
                        {
                          "node": "test",
                          "value":null ,
                          "children": [{
                            "node": "compare",
                            "children": [
                              { "node": "id", "value": "ifvar" },
                              { "node": "op", "value": "<=" },
                              { "node": "constant", "value": 10 }
                            ]
                          }]
                        },
                        {
                          "node": "body",
                          "children": [
                            {
                              "node": "assign",
                              "children": [
                                {
                                  "node": "id",
                                  "value": "a"
                                },
                                {
                                  "node": "binop",
                                  "children": [
                                    { "node": "id", "value": "m" },
                                    { "node": "op", "value": "+" },
                                    { "node": "constant", "value": 10 }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "node": "orelse",
                          "children": [
                            {
                              "node": "assign",
                              "children": [
                                {
                                  "node": "id",
                                  "value": "a"
                                },
                                {
                                  "node": "binop",
                                  "children": [
                                    { "node": "id", "value": "t" },
                                    { "node": "op", "value": "-" },
                                    { "node": "constant", "value": 18 }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {"node":"for",
    "value":null,
    "children":[      
      {
      "node": "iter",
      "value":null,
      "children": [
          { "node": "id", "value": "i" },
          { "node": "start","value":null, "children": [{ "node": "constant", "value": 1 ,"children":null}] },
          { "node": "end","value":null, "children": [{ "node": "constant", "value": 5,"children":null }] }
      ]
  },
  {
      "node": "body",
      "value":null,
      "children": [
        {
          "node": "assign",
          "value": null,
          "children": [
            {
              "node": "id",
              "value": "t",
              "children":null
            },
            {
              "node": "binop",
              "value": null,
              "children": [
                
                    { "node": "id", "value": "b", "children": null },
                    { "node": "op", "value": "*", "children": null },
                    { "node": "constant", "value": 10, "children": null }
                  
              ]
            }
          ]
        }
      ]
  }]}
            
      ],
      "value": null
    };
    const assemblyCode = [];
    translateProgram(syntaxTree, assemblyCode);
    const expectedassembly=[
      'MOV eax, 50\nMOV [a], eax',
      'MOV eax, [e]\nMOV [d], eax',
      'MOV ebx, [b]\nMOV eax, 10\nimul ebx, eax',
      'MOV [t], ebx',
      'MOV ebx, [a]\nMOV eax, r\nimul ebx, eax',
      'MOV eax, ebx\nMOV ebx, [b]\nidiv ebx, eax',
      'MOV [x], ebx',
      'MOV ebx, [r]\nMOV eax, 1\nadd ebx, eax',
      'MOV eax, ebx\nMOV ebx, [a]\nimul ebx, eax',
      'MOV eax, ebx\nMOV ebx, [b]\nidiv ebx, eax',
      'MOV [x], ebx',
      'MOV ebx, [a]\nMOV eax, 1\nimul ebx, eax',
      'MOV eax, ebx\nMOV ebx, [r]\nadd ebx, eax',
      'MOV eax, ebx\nMOV ebx, [a]\nimul ebx, eax',
      'MOV eax, ebx\nMOV ebx, [b]\nidiv ebx, eax',
      'MOV [x], ebx',
      'START_WHILE_LABEL_1:',
      'MOV ebx, 50',
      'MOV eax, [whilevar]',
      'CMP eax, ebx',
      'JUMP_IF_NOT_LESS_OR_EQUAL END_WHILE_LABEL_2',
      'MOV ebx, 10',
      'MOV eax, [ifvar]',
      'CMP eax, ebx',
      'JUMP_IF_NOT_LESS_OR_EQUAL ELSE_LABEL_3',
      'MOV ebx, [m]\nMOV eax, 10\nadd ebx, eax',
      'MOV [a], ebx',
      'JUMP END_IF_LABEL_4',
      'ELSE_LABEL_3:',
      'MOV ebx, [t]\nMOV eax, 18\nsub ebx, eax',
      'MOV [a], ebx',
      'END_IF_LABEL_4:',
      'JUMP START_WHILE_LABEL_1',
      'END_WHILE_LABEL_2:',
      'MOV eax, 1\nMOV [start], eax',
      'START_FOR_LABEL_5:',
      'MOV eax, [start]\nMOV ebx, 5\nCMP eax, ebx\nJUMP_IF_NOT_LESS END_FOR_LABEL_6 ',
      'MOV ebx, [b]\nMOV eax, 10\nimul ebx, eax',
      'MOV [t], ebx',
      'MOV eax, [start]\n' +
        'ADD eax, 1\n' +
        'MOV [start], eax\n' +
        'JUMP START_FOR_LABEL_5\n' +
        'END_FOR_LABEL_6 '
    ];
    

    expect(assemblyCode).to.deep.equal(expectedassembly);
  });

});
