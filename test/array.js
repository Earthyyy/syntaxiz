// const { expect } = require('chai');
// const { translateProgram } = require('../src/utils/server/index'); // Update the path accordingly

// describe('translateProgram for syntaxTree1', () => {
//   it('should correctly translate syntaxTree1 to assembly code', () => {
//     const syntaxTree = {
//         "node": "body",
//         "children": [
//             {
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "a",
//                     "children":null
//                   },
//                   {
//                     "node": "constant",
//                     "value": 50,
//                     "children": null
//                   }
//                 ]
//               }, {
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "d",
//                     "children":null
//                   },
//                   {
//                     "node": "id",
//                     "value":'e',
//                     "children": null
//                   }
//                 ]
//               },
//               {
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "t",
//                     "children":null
//                   },
//                   {
//                     "node": "binop",
//                     "value": null,
//                     "children": [
                      
//                           { "node": "id", "value": "b", "children": null },
//                           { "node": "op", "value": "*", "children": null },
//                           { "node": "constant", "value": 10, "children": null }
                        
//                     ]
//                   }
//                 ]
//               },
//               {
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "x",
//                     "children":null
//                   },
//                   {
//                     "node": "binop",
//                     "value": null,
//                     "children": [
                      
//                           { "node": "id", "value": "b", "children": null },
//                           { "node": "op", "value": "/", "children": null },
//                           {
//                             "node": "binop",
//                             "value": null,
//                             "children": [
                              
//                                   { "node": "id", "value": "a", "children": null },
//                                   { "node": "op", "value": "*", "children": null },
//                                   { "node": "constant", "value": "r", "children": null },
        
                                
//                             ]
//                           }
                        
//                     ]
//                   }
//                 ]
//               },{
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "x",
//                     "children":null
//                   },
//                   {
//                     "node": "binop",
//                     "value": null,
//                     "children": [
                      
//                           { "node": "id", "value": "b", "children": null },
//                           { "node": "op", "value": "/", "children": null },
//                           {
//                             "node": "binop",
//                             "value": null,
//                             "children": [
                              
//                                   { "node": "id", "value": "a", "children": null },
//                                   { "node": "op", "value": "*", "children": null },
//                                   {
//                                     "node": "binop",
//                                     "value": null,
//                                     "children": [
                                      
//                                           { "node": "id", "value": "r", "children": null },
//                                           { "node": "op", "value": "+", "children": null },
//                                           { "node": "constant", "value": "1", "children": null },
                
                                        
//                                     ]
//                                   },
        
                                
//                             ]
//                           }
                        
//                     ]
//                   }
//                 ]
//               },{
//                 "node": "assign",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "id",
//                     "value": "x",
//                     "children":null
//                   },
//                   {
//                     "node": "binop",
//                     "value": null,
//                     "children": [
                      
//                           { "node": "id", "value": "b", "children": null },
//                           { "node": "op", "value": "/", "children": null },
//                           {
//                             "node": "binop",
//                             "value": null,
//                             "children": [
                              
//                                   { "node": "id", "value": "a", "children": null },
//                                   { "node": "op", "value": "*", "children": null },
//                                   {
//                                     "node": "binop",
//                                     "value": null,
//                                     "children": [
                                      
//                                           { "node": "id", "value": "r", "children": null },
//                                           { "node": "op", "value": "+", "children": null },
//                                           {
//                                             "node": "binop",
//                                             "value": null,
//                                             "children": [
                                              
//                                                   { "node": "id", "value": "a", "children": null },
//                                                   { "node": "op", "value": "*", "children": null },
//                                                   { "node": "constant", "value": "1", "children": null },
                        
                                                
//                                             ]
//                                           },
                
                                        
//                                     ]
//                                   },
        
                                
//                             ]
//                           }
                        
//                     ]
//                   }
//                 ]
//               }, {
//                 "node": "while",
//                 "value": null,
//                 "children": [
//                   {
//                     "node": "test",
//                     "value": null,
//                     "children": [
//                       {
//                         "node": "compare",
//                         "value": null,
//                         "children": [
//                           { "node": "id", "value": "whilevar", "children": null },
//                           { "node": "op", "value": "<=", "children": null },
//                           { "node": "constant", "value": "50", "children": null }
//                         ]
//                       }
//                     ]
//                   },
//                   {
//                     "node": "body",
//                     "children": [
//                       {
//                         "node": "if",
//                         "value":null,
//                         "children": [
//                           {
//                             "node": "test",
//                             "value":null ,
//                             "children": [{
//                               "node": "compare",
//                               "children": [
//                                 { "node": "id", "value": "ifvar" },
//                                 { "node": "op", "value": "<=" },
//                                 { "node": "constant", "value": 10 }
//                               ]
//                             }]
//                           },
//                           {
//                             "node": "body",
//                             "children": [
//                               {
//                                 "node": "assign",
//                                 "children": [
//                                   {
//                                     "node": "id",
//                                     "value": "a"
//                                   },
//                                   {
//                                     "node": "binop",
//                                     "children": [
//                                       { "node": "id", "value": "m" },
//                                       { "node": "op", "value": "+" },
//                                       { "node": "constant", "value": 10 }
//                                     ]
//                                   }
//                                 ]
//                               }
//                             ]
//                           },
//                           {
//                             "node": "orelse",
//                             "children": [
//                               {
//                                 "node": "assign",
//                                 "children": [
//                                   {
//                                     "node": "id",
//                                     "value": "a"
//                                   },
//                                   {
//                                     "node": "binop",
//                                     "children": [
//                                       { "node": "id", "value": "t" },
//                                       { "node": "op", "value": "-" },
//                                       { "node": "constant", "value": 18 }
//                                     ]
//                                   }
//                                 ]
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               }
              
//         ],
//         "value": null
//       };
//     const assemblyCode = [];
//     translateProgram(syntaxTree, assemblyCode);
//     // for (i in assemblyCode){
//     //     console.log(assemblyCode[i]);
//     // }
//     console.log(assemblyCode);
//   });
// });
