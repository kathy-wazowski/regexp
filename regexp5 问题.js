// 练习：字符串中包含字母+数字的组合，字母后面的数字是几，字母就重复几次。具体看下列需求
'a4b1C2'.replace(/([a-zA-Z])(\d)/g, ($0, $1, $2) => $1.repeat($2)) ;

// ----------------------------------------------
// 练习：使用 match 拿到字符串的DOM内容
const [, tagName, attr, attrValues] = 'div.box2'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div, attr:. attrValues:box2
const [, tagName, attr, attrValues] = 'div#box2 box3'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div, attr:# attrValues:box2 box3
const [, tagName] = 'div'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div