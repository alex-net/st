<?php 

namespace app\models;

use Yii;

class Post extends \yii\base\Model
{
	public $id,$title,$body,$created;

	const sortTypes=['random','first-min','plain'];

	public function  rules()
	{
		return [
			[['title','body'],'string'],
			[['title','body'],'trim'],
			[['title','body'],'required'],
			['created','date'],
			['created','default','value'=>date('c')],
		];
	}

	public function attributeLabels()
	{
		return [
			'title'=>'Заголовок',
			'body'=>'Содержимое',
		];
	}

	/**
	 * сохранение данных записи ... 
	 * @param  array  $data Даннные post запроса ..
	 * @return bool       [description]
	 */
	public function save(array $data=[]):bool
	{
		Yii::info($data,'$data');
		if ($data && !$this->load($data) || !$this->validate())
			return false;
		$arr=$this->getAttributes($this->activeAttributes());
		if ($this->id)
			Yii::$app->db->createCommand()->update('{{%posts}}',$arr,['id'=>$this->id])->execute();
		else{
			Yii::$app->db->createCommand()->insert('{{%posts}}',$arr)->execute();
			$this->id=Yii::$app->db->lastInsertID;
		}

		return true;
	}

	/**
	 * запрос списка контента .. 
	 */
	public static function getList($sortType='random')
	{
		Yii::info($sortType,'$sortType');
		// нет такого типа сортировки ...
		if (!in_array($sortType, static::sortTypes))
			return;
		$q=new \yii\db\Query;
		$q->from('{{%posts}}');
		$q->select(['title','body','created']);

		// записи последней минуты ..
		if ($sortType=='first-min'){
			$q->where(['>','created',date('Y-m-d H:i:s',strtotime('-1 minutes'))]);
			$q->orderBy(['created'=>SORT_DESC]);
		}
		if ($sortType=='random')
			$q->orderBy(new \yii\db\Expression('rand()'));

		$cmd=$q->createCommand();
		return new \yii\data\SqlDataProvider([
			'sql'=>$cmd->sql,
			'params'=>$cmd->params,
			'pagination'=>false,
		]);

	}
}