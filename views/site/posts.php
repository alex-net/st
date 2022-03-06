<?php 

use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;

\app\assets\PostAsset::register($this);

$this->title='Список постов';
$f=ActiveForm::begin(['options'=>['class'=>'posts-form'],'enableClientScript'=>false]);
?>
<?=$f->field($m,'title')?>
<?=$f->field($m,'body')->textarea(['rows'=>5])?>
<div class="actions">
	<?=Html::submitButton('Добавить',['class'=>'btn btn-primary'])?>
</div>

<?php ActiveForm::end();?>
<div class="post-list">
	<div class='sort-types btn-group'>
		<span class="btn btn-light random active" data-type='random' title='Случайный порядок'><i class="fas fa-random"></i></span>
		<span class="btn btn-light" data-type='first-min' title='Последние за минуту'><i class="fas fa-hourglass-start"></i></span>
		<span class="btn btn-light" data-type='plain' title="Хронологический порядок"><i class="fas fa-sort-numeric-down"></i></span>
	</div>
	<div class="content"></div>
</div>