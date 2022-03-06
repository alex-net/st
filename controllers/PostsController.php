<?php 

namespace app\controllers;

use Yii;

//https://drive.google.com/file/d/1tqVj8b6kqrFKfmuDJ_fiW3BW4-fwKVNM/view

class PostsController extends \yii\rest\Controller
{
	public function behaviors()
	{
		return [
			[
				'class'=>\yii\filters\AccessControl::class,
				'rules'=>[
					['allow'=>true,'verbs'=>['post']]
				],
			]
		];
	}
	public function afterAction($act,$res)
	{
		$res=parent::afterAction($act,$res);
		return $this->asJson($res);
	}

	/**
	 * запрос списка статей .. 
	 * @return [type] [description]
	 */
	public function actionIndex()
	{
		$dp=\app\models\Post::getList(Yii::$app->request->post('sortType'));
		if (!$dp)
			return ['ok'=>false];
		return ['ok'=>true,'list'=>$dp->models];
	}

	/**
	 * сохранение формы .. .
	 * @return [type] [description]
	 */
	public function actionSave()
	{
		$post=new \app\models\Post;
		return [
			'ok'=>$post->save(Yii::$app->request->post()),
			'errors'=>$post->errors,
		];
	}

}