
define(['jquery', 'template', '../utils', 'uploadify', 'Jcrop'], function ($, template, utils) {
    // 设置导航
    utils.setMenu('/course/create');

    // 缓存一些公共数据
    var picture = $('#picture'),
        cs_id = utils.qs('cs_id'),
        html, jcrop_api;

    // 获取课程原始数据
    $.ajax({
        url: '/api/course/picture',
        type: 'get',
        data: {cs_id: cs_id},
        success: function (info) {
            // 调用模板引擎
            html = template('pictureTpl', info.result);
            // 追加DOM
            picture.html(html);

            // 获取图片裁切原始图片
            var preview = $('.preview img');

            // 调用上传文件的插件
            $('#upfile').uploadify({
                width: 70,
                height: 'auto',
                buttonText: '选择图片',
                formData: {cs_id: cs_id}, // data
                buttonClass: 'btn btn-success btn-sm',
                fileTypeExts: '*.png; *.gif; *.jpg',
                fileSizeLimit: '2MB',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original', // 相当 <input type="file" name="">
                // 用来定义进度条的html结构
                itemTemplate: '<span></span>',
                onUploadSuccess: function (file, info) {
                    // console.log(info)
                    var data = JSON.parse(info);

                    // 实现图片预览
                    preview.attr('src', data.result.path);

                    // 调用图片裁切插件
                    imageCrop(preview);

                    // 改变操作按钮状态
                    $('#cut')
                    .attr('data-status', 'save')
                    .val('保存图片')
                    .prop('disabled', false);
                }
            });

            // 点击进行裁切
            picture.on('click', '#cut', function () {
                var _this = $(this),
                    // 通过属性定义了裁切状态
                    status = _this.attr('data-status');

                if(status == 'save') {
                    // 已经设置了选区
                    // alert('设置了选区，可以提交数据到服务端');
                    // 将记录裁切数据的表单提交到服务端
                    $.ajax({
                        url: '/api/course/update/picture',
                        type: 'post',
                        data: $('#coords').serialize(),
                        success: function (info) {
                            // console.log(info)
                            if(info.code == 200) {
                                // 引导用户完成下一步
                                location.href = '/course/chapter?cs_id=' + info.result.cs_id;
                            }
                        }
                    })
                } else {
                    // 改变操作按钮状态
                    _this.attr('data-status', 'save');
                    _this.val('保存图片');

                    // 调用裁切
                    imageCrop(preview);
                }
            });

            // 获得实时的裁切尺寸
            preview.parent().on('cropstart cropmove cropend', function (e, s, c) {
                $('#x').val(c.x);
                $('#y').val(c.y);
                $('#w').val(c.w);
                $('#h').val(c.h);
            })
        }
    });

    // 封装图片裁切
    function imageCrop(preview) {
        // 避免多次实例操用
        if(jcrop_api) {
            jcrop_api.destroy();
        }

        preview.Jcrop({
            boxWidth: 400,
            aspectRatio: 2
        }, function () {
            // 赋值全局实例
            jcrop_api = this;

            // 计算选区尺寸
            var w = this.ui.stage.width, // 图片的真实宽度
                h = w / 2,
                x = 0,
                y = (this.ui.stage.height - h) / 2;

            // 新建一个选区
            this.newSelection();
            this.setSelect([x, y, w, h]);
            this.refresh();

            // 生成缩略图
            this.initComponent('Thumbnailer', {
                // 缩略图的尺寸
                width: 240,
                height: 120,
                thumb: '.thumb'
            });
        });
    }
});