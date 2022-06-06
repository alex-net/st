<?php 

namespace app\assets;

class PostAsset extends \yii\web\AssetBundle
{
    public $baseUrl = '@web/js';
    public $basePath = '@webroot/js';
    public $js = [
        ['url' => 'posts.jsx', 'type' => 'text/babel'],
    ];
    public $depends = [\yii\web\YiiAsset::class, \app\assets\ReactAsset::class];
}