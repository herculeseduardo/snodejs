var snodejs = {};
$(function() {
	$('.alert').hide();
});


$(function() {
		$('#bt-create-space').on('click', function() {
		if ($('#txt-namespace').val() && $('#txt-namespace').val().length > 0) {
			snodejs.managerApp('create_space'
				+'&namespace='+$('#txt-namespace').val()
				+'&description='+$('#txt-description').val()
				+'&author='+$('#txt-author').val()
				, function(res) {
				snodejs.get('registerSpace', 'time='+new Date().getTime(), undefined);
				snodejs.msg(res);
				$('#txt-namespace').val('');
				$('#txt-description').val('');
				$('#txt-author').val('');
				snodejs.listApp();				
			});
		}else{
			snodejs.msg({msg : 'Existe Campo vazio',type : 'error'});
		}
	});

	//----------------------------------------------------

	snodejs.listApp();
	
});

snodejs.listApp = function() {
	snodejs.managerApp('list_spaces', function(res) {
		if (res && res.list) {						

			$('#spaces tbody').html('');			
			for (var i = 0; i < res.list.length; i++) {
				$('#spaces tbody').append($('<tr/>')
					 		.append($('<td/>').html($('<a/>').attr('onclick', 'snodejs.showApp(\''+res.list[i].namespace+'/\');').text(res.list[i].namespace)))
					 		.append($('<td/>').text(res.list[i].description))
					 		.append($('<td/>').text(res.list[i].author))
					 		.append($('<td/>').html($('<button class="btn btn-primary btn-info" type="button" onclick="snodejs.showUploadDiagrama(\''+res.list[i].namespace+'\');">Show Apps</button>'))
					 		.append($('<span> <span/><button class="btn btn-primary btn-danger" type="button" onclick="snodejs.remove_space(\''+res.list[i].namespace+' \');">Remover</button>')))
					);				
			}			
		}
	});
};
snodejs.remove_space = function(namespace) {
	if(confirm('Deseja deletar o namespace '+namespace+' ?')){
		snodejs.managerApp('remove_space&namespace='+namespace, function(res) {
			snodejs.msg(res);
			snodejs.listApp();
		});
	}
};

snodejs.managerApp = function(method, fun) {
	snodejs.get('json', 'require=manager-app&method='+method, fun);	
};

snodejs.get = function(url, query, fun) {
	$.ajax({
	  url: url+'?'+query,	  
	  type: 'GET',
	  success: function(res){
	  	if(fun)fun(res);
	  }
	});
};

snodejs.msg = function(res) {
	$('.alert').hide();

	if(res.type == 'success')
		$('.alert').attr('class', 'alert alert-success');
	if(res.type == 'error')
		$('.alert').attr('class', 'alert alert-error');
	if(res.type == 'info')
		$('.alert').attr('class', 'alert alert-info');
	if(res.type == 'warn')
		$('.alert').attr('class', 'alert alert-block');

	$('.alert .text-alert').text(res.msg);
	$('.alert').show();
};

snodejs.showUploadDiagrama = function(namespace) {
	$("#apps").modal('show');
	$("#apps").data('snodejs-namespace', namespace);
	$("#apps #myModalLabel").text('Apps do Space ['+namespace+']');
	$('#apps #apps-content').load('http://localhost:8081/apps');
	
};

snodejs.showApp =  function(URL) { 
  var width = 600;
  var height = 500;
 
  var left = 99;
  var top = 99;
 
  window.open(URL,'janela', 'width='+width+', height='+height+', top='+top+', left='+left+', scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no'); 
}
