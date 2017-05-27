
define(['jquery', 'template', '../utils', 'form', 'validate'], function ($, template, utils) {
    // 设置导航
    utils.setMenu('/course/create');

    // 缓存一些公共数据
    var basic = $('#basic'),
        cs_id = utils.qs('cs_id'),
        html;

    // 请求原始信息在此基础上进行修改
    $.ajax({
        url: '/api/course/basic',
        type: 'get',
        data: {cs_id: cs_id},
        success: function (info) {

            // 调用模板引擎
            html = template('basicTpl', info.result);

            // 添加DOM
            basic.html(html);

            // 处理表单
            dealForm();
        }
    });

    // 根据顶级分类的id查询对应的所有的子分类
    basic.on('change', '#top', function () {
        var _this = $(this),
            pid = _this.val();

        $.ajax({
            url: '/api/category/child',
            type: 'get',
            data: {cg_id: pid},
            success: function (info) {

                // 字符串模板
                var tpl = '<option value="0">请选择子分类</option>\
                        {{each childs}}\
                            <option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
                        {{/each}}',

                    // 编译模板
                    render = template.compile(tpl);

                    // 生成html字符串
                    html = render({childs: info.result});

                // 添加DOM元素
                _this.next('select').html(html);
            }
        })
    });

    function dealForm() {
        basic.find('form').validate({
            sendForm: false,
            onKeyup: true,
            eachValidField: function () {},
            eachInvalidField: function () {},
            valid: function () {
                // 请求接口
                $(this).ajaxSubmit({
                    url: '/api/course/update/basic',
                    type: 'post',
                    success: function (info) {
                        if(info.code == 200) {
                            // 引导用户进行一下步操作
                            location.href = '/course/picture?cs_id=' + info.result.cs_id;
                        }
                    }
                });
            },
            description: {}
        });
    }
});