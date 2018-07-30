/*
*Author:Sooyee
*description:
*Date:2018/07/27 10:58:27
*/
'use strict';

var _mm = require('util/mm.js');
var _cart= {
    // 获取购物车数量
    getCartCount : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('./cart/get_cart_product_count.do'),
            success : resolve,
            error : reject,
        });
    }
};

module.exports = _cart;