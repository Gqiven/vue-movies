// //连接数据库
// // Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
// const mongoose = require('mongoose');
// // 连接数据库 如果不自己创建 默认test数据库会自动生成
// mongoose.connect('mongodb://localhost/test');

// // 为这次连接绑定事件
// const db = mongoose.connection;
// db.once('error',() => console.log('Mongo connection error'));
// db.once('open',() => console.log('Mongo connection successed'));
// /************** 定义模式loginSchema **************/
// const loginSchema = mongoose.Schema({
//     account : String,
//     password : String
// });

// /************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }

// module.exports = Models;



// DB Connection
var mongoose = require('mongoose');
//mongodb://localhost/[需要使用的数据库名称]
mongoose.connect('mongodb://localhost/movies', {
	useMongoClient: true
});
// 显示连接信息 成功／失败
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('open DB')
});

var Schema = mongoose.Schema;
var toplistSchema = new Schema({}, {collection: 'top250'});//这里需要{collection: 'xx'} 

var Toplist = mongoose.model('top250', toplistSchema);
module.exports = Toplist;

//数据方法
// var MovieDAO = function() {};


// MovieDAO.prototype.save = function(obj, callback) {
//   	var instance = new Movie(obj);
//   	instance.save(function(err){
//     	callback(err);
//   	});
// };

// MovieDAO.prototype.findByIdAndUpdate = function(obj,callback){
//   	var _id=obj._id;
//   	delete obj._id;
//   	Movie.findOneAndUpdate(_id, obj, function(err,obj){
//     	callback(err, obj);
//   	});
// }


// MovieDAO.prototype.findByName = function(name, callback) {
//   	Movie.findOne({name:name}, function(err, obj){
//     	callback(err, obj);
//   	});
// };

// module.exports = new MovieDAO();
