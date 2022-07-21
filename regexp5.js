// 今天继续说 replace 函数。 replace 在匹配到多个目标值时，回调函数也会执行多次

// 例子1: 匹配单个小写字母 + 单个数字的组合，并把这个组合的小写字母变成大写
// g 是全局匹配
'ab1cd1efg1'.replace(/([a-z])(\d)/g, ($0, $1, $2) => {
    // 这个函数会执行3次，分别匹配到 b1、d1 和 g1
    console.log($0, '$0'); // 3次分别为 b1, d1 和 g1
    console.log(`${$1.toLocaleUpperCase()}${$2}`, 'str');
    return `${$1.toLocaleUpperCase()}${$2}`; //B1d1
});

// 练习：字符串中包含字母+数字的组合，字母后面的数字是几，字母就重复几次。具体看下列需求
'a4b1C2'.replace(/([a-zA-Z])(\d)/g, ($0, $1, $2) => $1.repeat($2)) ;

// ----------------------------------------------

// 目前我们说的都是替换，下面我们说查找。

// 例子1：拿到字符串中连续大写字符
let result = null;
'aaBCDaaCC'.replace(/[A-Z]+/g, ($0) => {
    if (result === null) {
        result = [];
    }
    result.push($0);
    // 这里需要返回任何东西，因为 replace 并不会修改原字符串内容，
    // 只是会返回处理后的新字符串。所以，哪怕我们不返回内容会导致字符串替换的结果出问题，
    // 但是我们不需要这个结果时，就可以不做处理，
});
// 这个时候我们拿到了结果，可以通过判断来使用结果
if (result !== null) {
    // ... to do something
}

// 但是这样太过于繁琐，所以字符串还有一个 match 的方法。这个方法仅接受一个正则，
// 并且返回正则匹配的结果，结果是一个数组。
// [$1, $2, ..., $n]

// 例子2： 使用 match 拿到字符串中连续大写字符
const result = 'aaBCDaaCC'.match(/[A-Z]+/g); // 返回 ['BCD', 'CC']
// 拿到结果后，同样需要判断来使用结果。因为如果 match 方法没有匹配的内容
// ，返回的不是一个空数组，而是一个 null
if (result !== null) {
    // ... to do something
}

// 我们可以看到，上面的正则我们没有使用小括号，如果我们使用多个小括号，
// 那么 match 返回的结果是什么样的呢？看下面的例子
const result = 'A1B1'.match(/([A-Z])(\d)/g);

// 我们知道正则将匹配 A1 和 B1，但是我们让字母一个组，数字一个组。得到的结果如下
result; // 结果：[A1, B1]。并没有我们分组的内容。

// match 反复在使用正则全局匹配时，也就是使用 g 参数时。
// 只返回正则匹配的内容，不会返回分组的内容。也就是相当于只会返回 $0 的内容。
// 如果我们希望 match 也返回组的内容时。就不能使用全局匹配。
// 当我们不适用全局匹配时，match 方法会返回一个特殊的数组。

// 例子3：下面的正则没有 g
const result = 'A1B1'.match(/([A-Z])(\d)/);
result; // 返回结果：['A1', 'A', '1', index: 0, input: 'A1B1', groups: undefined]
// result[0], 匹配到的结果。正则不加 g 时匹配到第一个内容就停止查找了。 也就相当于 $0
// result[1], 第一个小括号的值 $1
// result[2], 第二个小括号的值 $2
// 剩下以此类推
// result.input 匹配的字符串全部内容
// result.groups 我忘了是啥了，从来也没用过。

// 练习：使用 match 拿到字符串的DOM内容
const [, tagName, attr, attrValues] = 'div.box2'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div, attr:. attrValues:box2
const [, tagName, attr, attrValues] = 'div#box2 box3'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div, attr:# attrValues:box2 box3
const [, tagName] = 'div'.match(/([a-z][a-z\d]*)(\.|#)?([a-z][a-z\d\s]*)?/); // 预期 tagName: div