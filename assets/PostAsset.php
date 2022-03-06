<?php 

namespace app\assets;

class PostAsset extends \yii\web\AssetBundle
{
	public $baseUrl='@web/js';
	public $basePath='@webroot/js';
	public $js=[
		'posts.js',
	];
	public $depends=[\yii\web\YiiAsset::class];
}