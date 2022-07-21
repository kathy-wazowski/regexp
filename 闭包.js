function returnParam (param) {
    // 虽然这个函数很简单，但是在实际的开发过程中，一般情况下这将是一个复杂且公用的函数
    // 所以当我们对这个函数有特殊的需求时，我们不会直接修改这个函数，因为函数比较复杂，带来的修改成本太大。而且是公用的函数，修改后影响面也比较大
    return param;
}

// 要求1：封装一个装饰器函数，返回一个包装后的 returnParam 函数。
// 要求2：经过包装的 returnParam 函数仅支持 number 类型的参数，其他类型的参数则使用 throw new Error('参数只能时数字') 进行提示
function createReturnNumberParam (handler) {
	return function(){
        if(arguments.length > 0){
            arguments = [...arguments]
            if(arguments.every( item => typeof item === 'number' )){
                return handler.apply(null, arguments);
            }else{
                throw new Error('wrong type of arguments');
            }
        }
    }
}

// 使用
const returnNumberParam = createReturnNumberParam(returnParam);
// 返回 4
returnNumberParam(4);
// 报错提示：参数只能时数字
returnNumberParam([]);

