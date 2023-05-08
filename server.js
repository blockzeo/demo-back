var functionFiel = require('./functionFile.js');//调用外部js文件
var express = require("./node_modules/express");//该模块的作用是用于发布post、getd等相关http接口
const bodyParser = require("./node_modules/body-parser");//该模块的作用是对http请求体进行解析
const mysql = require('mysql');
var app = express();

const db = mysql.createPool({
  host: '127.0.0.1', //数据库的ip抵制
  user: "root", //登录数据库的账号
  password: "123456", //登录数据库的米面
  database: "arknight" //指定要操作哪个数据库
})

//配置跨域相关
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", 'PUT, GET, POSTm DELETE, OPTIONS');
   res.header("Access-Control-Allow-Methods", 'X-Requested-With');
   res.header("Access-Control-Allow-Methods", 'Content-Type');
   next();
});
//监听8888端口
app.listen(8888, () => {
  console.log("Nodejs Server is opend\n\n");
})
//http请求体 解析格式设置（可多样）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//serverFunc post接口
app.get("/ShowStaff", (req, res) => {
  db.query("SELECT * from staff", (err, results) => {
    if(err) return console.log(err.message);
    //会显示staff表里的所有内容
    res.json(results)
  })
})
app.post("/AddStaff", (req, res) => {
  const query = req.body;
  const sql = "INSERT staff (cn) VALUES (" + query.name + ")";
  console.log(req)
  db.query(sql, (err, results) => {
    if(err) return console.log(err.message);
    //增加一个staff表里的所有内容
    res.json(results)
  })
})

//FunctionFileFunc post接口
app.post("/FunctionFileFunc", (req, res) => {
  console.log("'FunctionFileFunc' receipt of a request:");
  console.log(req.body);
  console.log("\n");
  var functionFileRet = functionFile.SayHello(req.body.name)
  res.json({
    "name": functionFileRet
  })
})
