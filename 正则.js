// 问题: 写出一个正则, 匹配字符中是否包含 【admin 后面跟跟随 4 个数字，
//并且这4个数字是以 1 开始】
const checkStr1 = '1asadmin1003s';
/admin1\d{3}/.test(checkStr1);

// 问题: 写出一个正则, 匹配字符中是否包含 【admin 后面跟跟随 4 个数字，
//并且这4个数字是以 1 或者 3 开始】
const checkStr2 = '1asadmin1003s';
const checkStr3 = '1asadmin3003s';
/admin[13]\d{3}/.test(checkStr2);
/admin[13]\d{3}/.test(checkStr3);

// 问题：写出一个手机号正则检测。【以 130、 131 或者 151 开头的手机号，
//手机号必须是 43、23 或者 21 结尾】。
const checkStr4 = '13011111143';
const checkStr5 = '13111111123';
const checkStr6 = '15111111121';
const checkStr7 = '13011111121';
const checkStr8 = '13111111143';
const checkStr9 = '15111111123';
/1[35][01]\d{6}[24][13]/.test(checkStr4);
/1[35][01]\d{6}[24][13]/.test(checkStr5);
/1[35][01]\d{6}[24][13]/.test(checkStr6);
/1[35][01]\d{6}[24][13]/.test(checkStr7);
/1[35][01]\d{6}[24][13]/.test(checkStr8);
/1[35][01]\d{6}[24][13]/.test(checkStr9);