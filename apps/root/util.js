var 
	constants = require('./constants');


exports.log = function(_log){
	console.log('______________ '+_log);
}

exports.log('load util ....');

var fs = require('fs');
exports.cadastrar = function(){
	console.log('cadastro de produtos '+ fs.utime );
	fs.readdir(constants.path_apps, function(err, files){
		for(var i in files){
			console.log(files[i]);
		}		
	})
}

exports.excluir = function(){
	console.log('exclusão de produtos '+ fs.utime );
}

exports.log('load util [ok]');