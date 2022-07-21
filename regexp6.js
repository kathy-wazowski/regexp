// 今天学习最后几个高级规则，很少使用，所以不用记住。只需要知道有这么个东西就行了。要用的时候，可以去这个链接查看 https://www.runoob.com/regexp/regexp-syntax.html

// 我们知道小括号会把匹配的内容分成一个组，比如下面的例子

// 例子1：我们想拿到域名的主域名，也就是 www.baidu.com 或者 m.baidu.com 我们只想要 baidu.com。
'www.baidu.com'.match(/(www|m)\.(baidu\.com)/); 

// 得到的结果：['www.baidu.com', 'www', 'baidu.com', index: 0, input: 'www.baidu.com', groups: undefined]
// 我们想要的内容索引值是 2，因为我们想要的内容在第 2 个小括号内。虽然这样也可以，但其实第一个小括号的值我们是不在乎的。但我们又不得不使用第一个小括号，因为我们需要一个 或 的关系。
// 当我们遇到这种情况时：我们需要使用小括号来做一下操作，但是我们不需要这个小括号的内容作为一个组的时候，我们就可以在小括号内使用 ?: 开头，表示这个小括号只提供一个组的功能，但忽略它是一个组的结果。

// 例子2：解决例子1的问题。
'www.baidu.com'.match(/(?:www|m)\.(baidu\.com)/); 

// 得到的结果是：['www.baidu.com', 'baidu.com', index: 0, input: 'www.baidu.com', groups: undefined]。我们想要的内容索引是 1，因为忽略掉了第一个小括号，第二个小括号的组 id 变成了 1

// 练习：在下列文件地址中，通过数组的 map 方法，返回 src/data 和 src/log 下的所有文件名
// （不包含路径），也就是说：['src/data/index.data'] 应该返回 index.data。
// 还有一个规律是 data 下的文件结尾都是 .data, log 下的文件结尾都是 .log
[
    'src/views/index.vue',
    'src/data/index.data',
    'src/data/detail.data',
    'src/log/index.log',
    'src/assets/index.css',
    'src/log/detail.log',
].map((path) => {
    return path.match(/(?:[a-z]+\/[a-z]+\/)([a-z]+\.[a-z]+)/)[1];
    // 在这里做处理，使用 match 或者 replace 方法随意，但是要用上 ?: 忽略非必要组
});
[
    'src/views/index.vue',
    'src/data/index.data',
    'src/data/detail.data',
    'src/log/index.log',
    'src/assets/index.css',
    'src/log/detail.log',
    'extra/src/log/detail.log',
].map((path) => {
    return path.replace(/(?:(?:[a-z]+\/)+)([a-z]+\.[a-z]+)/, ($0, $1) => {
        return $1;
    } );
    // 在这里做处理，使用 match 或者 replace 方法随意，但是要用上 ?: 忽略非必要组
});

// 除了 ?: 会忽略组之外，还有四个字符也会忽略组，也就是下面我们要说的 4 个高级规则。

// -------------------------------------------

// 正则中还有四个高级语法是前瞻、后顾、负前瞻和负后顾。其实我不太习惯记他们的名字，
// 我也是刚查资料确认的它们的名字。总是知道它们的作用就行，名字不重要。

// 先说前瞻。语法：exp1(?=exp2)，查找 exp2 前面的 exp1。

// 例子：假如有一篇文章，要把 “改正错误”，变成“避免错误”，
// 因为全文中还有其他的 “改正” 是不能替换掉的。
let str = '今后我们一定要积极的改正错误，改正观念，加强意识';

// 这里非要用前瞻吗？不一定，我们就用之前学习的字符串替换不是也行吗？
// 是的，看一下之前我们要解决这个问题该如何写
str.replace(/改正(错误)/g, ($0, $1) => `避免${$1}`);
// 解释：因为我们匹配到的内容是 “改正错误” 这4个字，但是 “错误” 这两个字是我们还要用的。
// 所以，我们需要把 “错误” 这两个字拿出来，然后做字符串拼接
// 注意：正则使用了 g 参数，因为全局可能有多处，所以要全局查找

// 如果用前瞻就会变成这个样子
str.replace(/改正(?=错误)/g, '避免');
// 解释：因为前瞻也会忽略掉组的内容，所以我们这里匹配到的内容是 “改正”，
// 只不过这个 “改正” 一定是 “错误” 前面的改正。所以我们只返回 “避免” 就行了
// 前瞻虽然更难理解，但是也更简洁

// 练习：把 .vue 结尾的文件夹名称都替换成 views
[
    'html/index.vue',
    'html/detail.vue',
    'views/log.vue',
].map((path) => {
    // 可以任意使用 match 和 replace，但要求使用前瞻
    return path.replace(/[a-z]+(?=\/[a-z]+\.vue)/, 'views')
});
[
    'html/index.vue',
    'html/detail.vue',
    'views/log.vue',
].map((path) => {
    // 用match 我写不出来
    return path.match(/[a-z]+(?=\/[a-z]+\.vue)/)[0] //['html', 'html', 'views']
});
// -----------------------------------

// 再说一个后顾，语法：(?<=exp2)exp1， 查找 exp2 后面的 exp1
// 例子：假如有一篇文章，要把 “改正观念”，变成“改正态度”，。
let str = '今后我们一定要积极的改正错误，改正观念，加强意识';

// 这个就不做普通的方式例子了，总之普通的方式也能解决，但是不如后顾简洁
// str.replace(/(?<=改正)错误/g, '态度');
str.replace(/(?<=改正)观念/g, '态度');
// 这个也就不给练习题了，基本上前瞻能搞定，后顾就能搞定。


// -----------------------------------

// 负前瞻和负后顾是相比于前瞻跟后顾更重要的，因为前瞻跟后顾我们都可以用普通的方式代替，
// 无非就是麻烦一点。但是负前瞻和负后顾是没有方法代替的。

// 负前瞻。语法：exp1(?!exp2)，查找后面不是 exp2 的 exp1。跟前瞻的区别就是把 = 变成了 !

// 还是以上面的字符串为例子。我们要把后面不是 “错误” 的 “改正”，替换成 “加强”
let str = '今后我们一定要积极的改正错误，改正观念，加强意识';

// 这个普通的正则没有办法做连续字符的非，[^]中括号以 ^ 开头也只是单个字符的非。
// 比如 [^错误]，只能匹配不是 “错”，或者 不是 “误”
// 当我们在正则中需要对连续的字符做 非 操作时，就需要使用到 负前瞻 和 负后顾。

// 使用 负前瞻 解决上面的问题
str.replace(/改正(?!错误)/, '加强');
//'今后我们一定要积极的改正错误，加强观念，加强意识'

// 有时候我们用小括号加 | 的形式可以匹配多种合法字段，因为我们可以无限制的去加 |，
// 但是有时候，合法字段过于庞大时，这么做是不现实的。但如果非法字段的数量要远远少于合法字段时，
// 我们可以使用负前瞻和负后顾来最小成本的拿到所有合法内容。 
// 练习：找到 api/ 不是 list 的所有接口，
[
    '/api/a/cccc/d',
    '/api/add/cccc/d',
    '/api/sss/d/d',
    '/api/spa/c/d',
    '/api/ssr/c/d',
    '/api/ddp/c/www/ss',
    '/api/list/sss',
].map((path) => {
    const result =  path.match(/\/api\/(?!list)/)
    if(result){
        return result.input;
    }
}).filter(item => item); // 不然会有一个undefined 在数组里

[
    '/api/a/cccc/d',
    '/api/add/cccc/d',
    '/api/sss/d/d',
    '/api/spa/c/d',
    '/api/ssr/c/d',
    '/api/ddp/c/www/ss',
    '/api/list/sss',
].map((path) => {
    const result =  path.match(/\/api\/(?!list)(\/[a-z]+)+/)
    console.log(result, 'result'); // null, 为什么匹配不上
});

[
    '/api/a/cccc/d',
    '/api/add/cccc/d',
    '/api/sss/d/d',
    '/api/spa/c/d',
    '/api/ssr/c/d',
    '/api/ddp/c/www/ss',
    '/api/list/sss',
].map((path) => {
    const result =  path.match(/\/api\/[a-z]{1,3}(\/[a-z]+)+/)
    if(result){
        return result[0]
    }
}).filter(item => item);

// 负后顾。语法：(?<!exp2)exp1，查找前面不是 exp2 的 exp1。跟后顾的区别也是把 = 变成了 !
// 这个就不用练习了，负前瞻能做出来，负后顾也就没有问题。