jQuery(function(){
	// отправка формы .. 
	$('form.posts-form').on('submit',(e)=>{
		e.preventDefault();
		let form=$(e.target);
		fetch('/post/save',{
			method:'post',
			body:form.serialize(),
			headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).then((resp)=>resp.json()).then((ret)=>{
			form.find(':input.form-control').removeClass('is-invalid is-valid').addClass('is-valid');
			if (ret.errors)
				for(let k in ret.errors){
					let el=form.find(':input.form-control[name="Post['+k+']"]');
					el.toggleClass('is-invalid is-valid');
					el.siblings('.invalid-feedback').html(ret.errors[k]);
				}
			// всё сохранилось надо обновить список
			if (ret.ok)
				$('.post-list').trigger('update-post-list');
		});
	});


	// обработка кнопок сортировки ... 
	$('.post-list .sort-types').on('click','span',(e)=>{
		let el=$(e.currentTarget);
		if (!el.hasClass('active')){
			el.parent().find('.active').removeClass('active');
			el.addClass('active');
		}
		$('.post-list').trigger('update-post-list');
	});

	$('.post-list').on('update-post-list',(e)=>{
		let sortType=$(e.target).find('.sort-types span.active').data('type');
		fetch('/post',{
			method:'post',
			body:'sortType='+sortType,
			headers:{'Content-Type':'application/x-www-form-urlencoded'},
		}).then((resp)=>resp.json()).then((ret)=>{
			$('.post-list .content').html('');
			if (ret.ok)
				for(let i=0;i<ret.list.length;i++){
					let el=$('<div>');
					el.addClass('item');
					let head=$('<div>');
					head.addClass('head');
					head.append('<span class="date">'+ret.list[i].created+'</span>');
					head.append('<span class="title">'+ret.list[i].title+'</span>');
					el.append(head);
					head=$('<div>');
					head.addClass('body');
					head.html(ret.list[i].body);
					el.append(head);
					$('.post-list .content').append(el);
				}
		});
	}).trigger('update-post-list');
});