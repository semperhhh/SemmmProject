var path = require("path");//系统路径模块
var express = require("express");
var app = express();

var workSpacePath = "/WorkSpace";
var templatePath = "/templates";

var mysqlClass = require("./WorkSpace/js/list-mysqlClass")//数据库类

//首页
app.get("/", function (request, response) {
    console.log("/home");
    response.sendfile(__dirname + workSpacePath + "/index.html");
});

//列表界面
app.get("/lists", function (request, response) {
    console.log("/lists");
    response.sendfile(__dirname + workSpacePath + templatePath + "/list.html");
});

//列表内容
app.get("/lists/query", function (request, response) {

    console.log("/lists/query");

    mysqlClass.queryLists(function (lists) {

        var nmLists = [];

        for (var index in lists) {

            var list = lists[index];
            var nmDict = {};
            nmDict.POSTS_TITLE = list.title;
            nmDict.POSTS_LIKEED = list.likeed;
            nmDict.POSTS_READED = list.readed;

            //创建时间
            if (list.create_time) {
                var t = list.create_time;
                nmDict.POSTS_CREATE_TIME = t.getFullYear() + "年 " + (t.getMonth() + 1) + "月 " + t.getDate() + "号 " + t.getHours() + "时";
            }

            //最后更新时间
            if (list.updata_time) {
                var t = list.updata_time;
                nmDict.POSTS_UPDATA_TIME = t.getFullYear() + "年 " + (t.getMonth() + 1) + "月 " + t.getDate() + "号 " + t.getHours() + "时";
            }

            //标签
            if (list.tags) {
                var tags = list.tags;
                var tagLists = tags.split(",");
                nmDict.POSTS_TAG = tagLists;
            }

            //分类
            if (list.category == 0) {
                nmDict.POSTS_CATEGORY = "乱写";
            } else if (list.category == 1) {
                nmDict.POSTS_CATEGORY = "瞎记";
            } else if (list.category == 2) {
                nmDict.POSTS_CATEGORY = "幻想";
            }

            nmLists.push(nmDict);
        }
        response.json(nmLists);
    });
})

//文章
app.get("/posts", function (request, response) {
    console.log("/posts");
    response.sendfile(__dirname + workSpacePath + templatePath + "/posts.html");
})

//文章内容
app.get("/posts/query", function (request, respose) {
    console.log("/posts/query");
    var params = request.query;
    console.log(params);
    var title = params["title"];
    respose.send("文章内容");
})

//关于
app.get("/about", function (request, response) {
    console.log("/about");
    response.sendfile(__dirname + workSpacePath + templatePath + "/about.html");
})

app.use(express.static(path.join(__dirname  + workSpacePath)));//指定静态文件目录

app.listen(8181);