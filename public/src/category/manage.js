
define(['jquery', '../utils', 'template', 'form', 'validate'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/category/index');

    var html,
        cg_id = utils.qs('cg_id'),
        category = $('#category');

    if(cg_id) { // 根据地址上有无cg_id判断是否为编辑
        // 编辑
        $.ajax({
            url: '/api/category/edit',
            type: 'get',
            data: {cg_id: cg_id},
            success: function (info) {
                // 追加数据（表单共享了但是提交地址不同）
                info.result.action = '/api/category/modify';
                // 调用模板引擎
                html = template('manageTpl', info.result);
                // 追加DOM
                category.html(html);

                // 表单处理（提交和验）
                // 封装复用
                dealForm();

                // 原分类的默认状态
            }
        });   
    } else {
        // 调用模板引擎
        // 生成html
        html = template('manageTpl', {
            // 追加数据，接口地址不同
            action: '/api/category/add'
        });

        // 添加DOM
        category.html(html);

        // 只需要将顶级分类取出

        // 需要将顶级分类取出
        $.ajax({
            url: '/api/category/top',
            type: 'get',
            success: function (info) {
                // 字符串形式的模板
                var tpl = '{{each category}}\
                            <option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
                        {{/each}}',

                // 编译模板字符串
                render = template.compile(tpl);

                // 生成html字符串
                html = render({category: info.result});

                // 添加DOM
                $('#cgPid').append(html);

                // 表单处理（提交和验）
                // 封装复用
                dealForm();
            }
        });
    }

    // 处理表单
    function dealForm() {
        category.find('form').validate({
            sendForm: false,
            onKeyup: true,
            eachValidField: function () {},
            eachInvalidField: function () {},
            valid: function () {
                $(this).ajaxSubmit({
                    type: 'post'
                });
            },
            description: {},
            conditional: {}
        });
    }
});