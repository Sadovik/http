function module_FS(comand) {
	this.dataLine = comand;
	if ( this.dataLine.filename && this.dataLine.method) {
		this.file = this.dataLine.filename;
		this.array = this.file.split(".");
		this.comMethod = this.dataLine.method;
	}
	this.spawn = require("child_process").spawn;

	var now     = new Date();
	var year    = now.getFullYear();
	var month   = now.getMonth()+1;
	var day     = now.getDate();
	var hour    = now.getHours();
	var minute  = now.getMinutes();
	var second  = now.getSeconds();

		if(month.toString().length == 1) {
			var month = '0'+month;
		}
		if(day.toString().length == 1) {
			var day = '0'+day;
		}
		if(hour.toString().length == 1) {
			var hour = '0'+hour;
		}
		if(minute.toString().length == 1) {
			var minute = '0'+minute;
		}
		if(second.toString().length == 1) {
			var second = '0'+second;
		}

	this.dateTime = year+'.'+month+'.'+day+'_'+hour+'.'+minute+'.'+second;

	if ( this.dataLine.filename && this.dataLine.method) {
		console.log('For file: ' + this.file + ' was applied method ' + this.comMethod);
	}
}

module_FS.prototype.Copy = function() {
	var dir = this.spawn('cmd', [
		'/S',
		'/C',
		'copy ' + this.file +' ' + this.array[0] + '_' + this.dateTime + '.' + this.array[1]
	]);
	dir.stdout.pipe(process.stdout);
}

module_FS.prototype.Del = function() {
	var dir = this.spawn('cmd', [
		'/S',
		'/C',
		'del ' + this.file
	]);
	dir.stdout.pipe(process.stdout);
}

module_FS.prototype.In = function() {
	var fs = require("fs"),
		path = require("path");

	var p = "./"
	fs.readdir(p, function (err, files) {
		if (err) {
			throw err;
		}

		files.map(function (file) {
			return path.join(p, file);
		}).filter(function (file) {
			return fs.statSync(file).isFile();
		}).forEach(function (file) {
			if ( file.split('.').pop() === 'txt') {
				console.log(file);
			}
		});
	});
}

module.exports = module_FS;
