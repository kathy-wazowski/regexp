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
    const regexp = /src\/(?:data|log)\/([a-z]+\.[a-z]+)/;
    return path.match(regexp) ? path.match(regexp)[1] : undefined;
    // 在这里做处理，使用 match 或者 replace 方法随意，但是要用上 ?: 忽略非必要组
}).filter(item => item);
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

// -------------------------------------------


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
    const result =  path.match(/\/api\/(?!list)([a-z]+)(\/[a-z]+)+/)
    if(result){
        return result[0];
    }
}).filter(item => item);

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
