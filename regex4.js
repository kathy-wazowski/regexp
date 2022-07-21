// 上次我们说了 () 有分组的作用，但是没说分组如何使用。
//今天主要说明分组的使用，也就是常用的字符串替换或者查找

// 在这之前，还需要在补充几个常用的特殊符号。\s 表示空字符，空格、换行符和制表符等都是空字符。

// 例子1: 检测字符串是否包含空白字符
/\s/.test('sdfsdf sdf'); // 返回 true。

// 上次说的在 () 中可以使用 | 表示或， | 不仅可以用在小括号，可以用在任何地方，
// 除了 [] 里。因为 [] 里的字符本身就是或的关系

// 例子2：检测字符中是否包含 aaa 或者 bbbb
/a{3}|b{4}/.test('1aaa'); // 返回 true。
/a{3}|b{4}/.test('1bbbb'); // 返回 true。

// 练习：写一个正则，检测字符串前后是否包含空字符。这种场景一般管理后台会用在输入框
/^\s|\s$/.test('     aAs0') === true;
/^\s|\s$/.test('111## ') === true;
/^\s|\s$/.test('a F #1') === false;

/正则/.test('     aAs0') === true;
/正则/.test('111## ') === true;
/正则/.test('a F #1') === false;


// 再补充一个特殊字符 \w, 表示匹配字母、数字、下划线。等同于 [a-zA-Z0-9_]。
// 这个比较少用，只有要匹配的内容满足是字母、数字 和 下划线时采用。

// 例子3：检测字符串中是否包含字符
/\w/.test('a'); // 返回 true。
/\w/.test('A'); // 返回 true。
/\w/.test('a'); // 返回 true。
/\w/.test('_'); // 返回 true。

// -------------------------------------------

// 在这里还有一个需要说明，\大写字母就表示非。比如 \s 表示空字符，\S 就表示非空字符。
// \d 表示数字， \D 就表示非数字。依次类推。

// 如果我们真的想要检测一个特殊字符，需要加上 \。 \ 会把特殊字符转译成它本身的意思。
// 比如 . 表示任意字符，\. 就表示 . 本身。其他都一样。

// 例子1：检测字符串是否为小数。
/\d+.\d+/.test('1.22'); // 虽然也返回 true，但这里的 . 表示的是任意字符。并不是小数点。
//如果我们想表示小数点，就需要使用 \. 可以看下面的例子

/\d+.\d+/.test('1-22'); // 这个也返回 true
/\d+\.\d+/.test('1-22'); // 使用 \. 后这个返回 false了，
/\d+\.\d+/.test('1.22'); // 使用 \. 这个返回了true，

// 如果我们要单纯的检测 \ 呢。因为 \ 也是特殊字符。 它虽然本身没有意义，
// 但是 \ 后面跟字符就代表特殊字符。比如 \d 代表数字。所以，如果要单纯的检测 \，
// 也是需要在 \ 前面加 \ 进行转译。
// 例子2：检测 a\b
/a\\b/.test('a\b'); // 返回 true。

// 练习：写一个正则，检测字符串是否是域名。
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.bybit.com') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.bybit.com/') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.bybit.com:80/') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.bybit.com:3000/') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.baidu.com') === true;
/^https?:\/\/(www)|(m)\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://m.baidu.com') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://m.baidu.cn') === true;
/^https?:\/\/(www)|m\.[a-z]+\.(com)|(cn)(\/|(:\/\d+\/))?$/.test('http://www.bybit.com/:80') === true;

/正则/.test('http://www.bybit.com') === true;
/正则/.test('http://www.bybit.com/') === true;
/正则/.test('http://www.bybit.com:80/') === true;
/正则/.test('http://www.bybit.com:3000/') === true;
/正则/.test('http://www.baidu.com') === true;
/正则/.test('http://m.baidu.com') === true;
/正则/.test('http://m.baidu.cn') === true;


// --------------------------------------------

// 现在开始说明字符串替换，字符串替换需要用到一个函数：String.prototype.replace。
// 函数的第一个参数是一个正则，检测用来匹配的内容，第二个参数可以是一个字符串，
// 表示替换匹配到的内容。第二个参数可以是一个函数，这个后面再说。

// 例子1: 替换小写的 a 位 大写的 A
'an apple'.replace(/a/, 'A'); // 返回 'An apple'

// 这里可能会有疑问，不是有 2 个小写的 a 吗，为什么只替换了 第一个。
// 因为正则默认在找到第一个值后就不继续找了，
// 如果想找到所有的，需要在正则后面跟一个 g ，表示全局查找

// 例子2: 替换所有小写的 a 位 大写的 A
'an apple'.replace(/a/g, 'A'); // 返回 'An Apple'

// 练习：实现字符串的 trim 函数功能，就是抹去字符串的前后空字符
function trim(str){
    return str.replace(/(^\s+)|(\s+$)/g, '')
}
trim('     aAs0');
trim('111## ');
trim('a F #1');
/正则/.test('     aAs0') === 'aAs0';
/正则/.test('111## ') === '111##';
/正则/.test('a F #1') === 'a F #1';

// --------------------------------------------

// replace 方法第二个参数也可以时一个函数，函数要返回一个字符串，作为替换的值。
// 函数的作用就是为了更方便的获取一个 组，也就是小括号中的内容

// 例子1：返回 a + c
'abcd'.replace(/(a)b(c)/, ($0, $1, $2) => {
    console.log($0, '$0');
    console.log(`${$1} + ${$2}`, 'str');
    return 'nice'
}); 
// 返回 'a + c'。$0 是匹配到的字符串，也就是 abc。
// $1 是第一个小括号，也就是 a, $2 是第二个小括号，也就是 c

// 练习：把DOM描述符替换成 DOM 字符串。
// 仅支持 class 和 id，. 代表 class，# 代表id。所有的标签都有结束标签。
'h1.title'.replace(/(^[a-z][a-z1-9]*)(\.|#)(\w+)/, ($0,$1,$2,$3)=>{
    let identifier = '';
    if($2 === '.'){
        identifier = 'class';
    }
    if($2 === '#'){
        identifier = 'id';
    }
    return `<${$1} ${identifier}="${$3}"></${$1}>`
});
'div#title'.replace(/(^[a-z][a-z1-9]*)(\.|#)(\w+)/, ($0,$1,$2,$3)=>{
    let identifier = '';
    if($2 === '.'){
        identifier = 'class';
    }
    if($2 === '#'){
        identifier = 'id';
    }
    return `<${$1} ${identifier}="${$3}"></${$1}>`
});

'h1.title'.replace(/正则/, ()={}); // 返回 <h1 class="title"></h1>
'div#title'.replace(/正则/, ()={}); // 返回 <div id="title"></div>