
requirejs.config({
    baseUrl: '/public',
    paths: {
        jquery: 'assets/jquery/jquery.min',
        cookie: 'assets/jquery-cookie/jquery.cookie',
        template: 'assets/artTemplate/template-web',
        nprogress: 'assets/nprogress/nprogress',
        validate: 'assets/jquery-validate/jquery-validate.min',
        form: 'assets/jquery-form/jquery.form',
        bootstrap: 'assets/bootstrap/js/bootstrap.min',
        datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',
        language: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min'
    },
    shim: {
        validate: {
            deps: ['jquery'] // 使用别人东西（依赖）
        },
        bootstrap: {
            deps: ['jquery']
        },
        language: {
            deps: ['datepicker', 'jquery']
        }
    }
});

require(['src/common', 'bootstrap']);
