
define(['jquery', '../utils', 'form', 'validate'], function ($, utils) {
    // 设置导航
    utils.setMenu('/course/create');

    $('#createForm').validate({
        sendForm: false,
        onKeyup: true,
        eachValidField: function () {},
        eachInvalidField: function () {},
        valid: function () {
            $(this).ajaxSubmit({
                url: '/api/course/create',
                type: 'post',
                success: function (info) {
                    if(info.code == 200) {
                        // / ~ http://yourhost/
                        // http://bxg.com/course/basic
                        // 引导用户下一步操作
                        location.href = '/course/basic?cs_id=' + info.result.cs_id;
                    }
                }
            });
        },
        description: {},
        conditional: {}
    });

});