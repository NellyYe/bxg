<?php 

// phpinfo();exit;
//通过PHP来获取地址的信息
//根据地址信息执行不同的逻辑

//PHP 通过$_GET可以获得 get
//PHP 通过$_POST可以获得 post
//PHP 通过$_FILES可以获得 上传的文件
//PHP 还提供了$_SERVER 可以获得服务器信息

// var_dump($_SERVER);

$pathinfo = $_SERVER['PATH_INFO'];


// include './views' . $pathinfo . '.html';

//当网站规模较大时，页面较多
//这是有必要对路由进行设计，已达到优化的目的
//通过分析博学谷项目发现页面基本是两层结构
//例如讲师包含 添加 修改 
//课程管理包含 基本信息，图片信息，课时信息
//
//为保证地址和灵活性，地址需要支持一层结构
//bxg.com/index/index
//bxg.com/teacher/teacher_add
//
//判断是一层结构还是两层
//将$pathinfo拆分成数组，然后判断数据情况得到地址的结构
//在PHP中如何将字符串拆分成数组
//使用explode()将字符串拆成数组

$pathinfo = substr($pathinfo, 1);
// echo "<br>";
// echo $pathinfo;

$route = explode('/', $pathinfo);

// print_r($route);

//php使用empty()函数可以判断某个变量是否为空
//为空为true，否则为false

// var_dump(empty($pathinfo));

if(empty($pathinfo)){
	$path = 'index/index';
}elseif (count($route)==1) {
	$path = 'index/'. $route[0];
}else {
	$path = $route[0].'/'.$route[1];
}


include './views/'.$path.'.html';

 ?>