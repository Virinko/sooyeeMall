/*
*Author:Sooyee
*description:通用工具
*Date:2018/07/19 16:41:27
*/
'use strict';

var hogan = require('hogan.js');
var conf = {
    serverHost : ''
}
var _mm = {
    // 网络请求
    request : function (param) {
        var _this = this;
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function (res) {
                // 请求成功
                if (0 === res.status){
                    typeof param.success === 'function' && param.success();
                }
                // 没有登录状态，需要强制登录
                else if (10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error : function (err) {
                typeof param.error === 'function' && param.error(res.statusText);
            }
        });
    },
    // 获取服务器地址（后端接口地址）
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取URL参数
    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        //decodeURIComponent用于解码
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染HTML模板
    renderHtml : function(htmlTemplate,data){
        var template = hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value,type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if('email' === type){
            return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value);
        }
    },
    // 统一登录处理
    // 从哪跳出登录页，则返回哪一页，所以将当前页面的路径传过去window.location.href
    // 用encodeURIComponent对路径进行完全编码
    doLogin : function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;