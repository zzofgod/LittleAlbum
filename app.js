var express = require("express");
var bodyParser = require('body-parser')
var app = express();
//控制器
var router = require("./controller");

//设置模板引擎
app.set("view engine", "ejs");

//路由中间件，静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//首页
app.get("/", router.showIndex);
app.get("/:albumName", router.showAlbum);
app.get("/up", router.showUp);
app.post("/up", router.doPost);
app.get("/createdir", router.createDir);
app.post("/createdir", router.doPostdir);
app.post("/removedir", router.removedir);
app.post("/renamedir", router.renamedir)
app.post("/removefile", router.removefile)

//404
app.use(function (req, res) {
  res.render("err");
});

app.listen(3100, function (err) {
  if (err) throw err
  console.log("running in 3100")
});