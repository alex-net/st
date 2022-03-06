<?php

use yii\db\Migration;

/**
 * Class m220221_161126_start
 */
class m220221_161126_start extends Migration
{
    
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        // таблица статей 
        $this->createTable('{{%posts}}',[
            'id'=>$this->primaryKey()->comment('Ключик статьи'),
            'title'=>$this->string(100)->notNull()->comment('Заголовок статьи'),
            'created'=>$this->timestamp()->notNull()->defaultExpression('current_timestamp()')->comment('время добавления'),
            'body'=>$this->text()->comment('Содержимое статьи'),
        ]);
        $this->createIndex('postscreateind','{{%posts}}',['created']);
    }

    public function down()
    {
        $this->dropTable('{{%posts}}');
    }
}
