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
              }
              
        ],
        "value": null
      };
    const assemblyCode = [];
    translateProgram(syntaxTree, assemblyCode);
    const expectedassembly=[
        'MOV eax, 50\nMOV |a|, eax',
        'MOV eax, |e|\nMOV |d|, eax',
        'MOV ebx, |b|\nMOV eax, 10\nimul ebx, eax',
        'MOV |t|, ebx',
        'MOV ebx, |a|\nMOV eax, r\nimul ebx, eax',
        'MOV eax, ebx\nMOV ebx, |b|\nidiv ebx, eax',
        'MOV |x|, ebx',
        'MOV ebx, |r|\nMOV eax, 1\nadd ebx, eax',
        'MOV eax, ebx\nMOV ebx, |a|\nimul ebx, eax',
        'MOV eax, ebx\nMOV ebx, |b|\nidiv ebx, eax',
        'MOV |x|, ebx',
        'MOV ebx, |a|\nMOV eax, 1\nimul ebx, eax',
        'MOV eax, ebx\nMOV ebx, |r|\nadd ebx, eax',
        'MOV eax, ebx\nMOV ebx, |a|\nimul ebx, eax',
        'MOV eax, ebx\nMOV ebx, |b|\nidiv ebx, eax',
        'MOV |x|, ebx',
        'WHILE_LABEL_1:',
        'MOV eax, |whilevar|\nMOV ebx, 50\nCMP eax, ebx',
        'JUMP_IF_NOT_LESS_OR_EQUAL WHILE_LABEL_2',
        'MOV eax, |ifvar|\nMOV ebx, 10\nCMP eax, ebx',
        'JUMP_IF_NOT_LESS_OR_EQUAL IF_LABEL_3',
        'MOV ebx, |m|\nMOV eax, 10\nadd ebx, eax',
        'MOV |a|, ebx',
        'JUMP IF_LABEL_4',
        'IF_LABEL_3:',
        'MOV ebx, |t|\nMOV eax, 18\nsub ebx, eax',
        'MOV |a|, ebx',
        'IF_LABEL_4:',
        'JUMP WHILE_LABEL_1',
        'WHILE_LABEL_2:'
      ];
    

    expect(assemblyCode).to.deep.equal(expectedassembly);
  });

});
