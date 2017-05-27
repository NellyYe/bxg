
define(['jquery', '../utils', 'template'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/category/index');

    var html;

    $.ajax({
        url: '/api/category',
        type: 'get',
        success: function (info) {
            // 调用模板引擎
            html = template('categoryTpl', {category: info.result});
            // 添加DOM
            $('#category').find('tbody').html(html);
        }
    })

})