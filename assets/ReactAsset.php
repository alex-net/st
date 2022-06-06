<?php 

namespace app\assets;

class ReactAsset extends \yii\web\AssetBundle
{
    public $js=[
        ['url' => 'https://unpkg.com/babel-standalone@6/babel.min.js'],
        ['url' => 'https://unpkg.com/react@17/umd/react.development.js', 'crossorigin' => true],
        ['ulr' => 'https://unpkg.com/react-dom@17/umd/react-dom.development.js', 'crossorigin' => true],
    ];
}