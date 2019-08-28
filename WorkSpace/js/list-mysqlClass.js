var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "39.96.82.100",
    user: "root",
    password: "12345678",
    database: "blog",
});

connection.connect();

//查询-列表   
/*
    page 页数
*/
function queryLists(page, callback) {
    var sqlCount = (page ? page : 0) * 10;//如果没有默认1
    var sqlStr = "select * from postslist order by id desc limit 10 offset ?";
    var sqlParam = [sqlCount];
    connection.query(sqlStr, sqlParam, function (error, results, fields) {
        if (error) {
            throw error;
        }
        callback(results);
    });
}

//查询-文章标题
function queryPosts(title, callback) {

    var sqlStr = "select * from postslist where title = ?";
    var sqlParam = [title];
    connection.query(sqlStr, sqlParam, function (error, results, fields) {
        if (error) {
            throw error;
        }
        callback(results);
    });
}

module.exports = {
    queryLists: queryLists,
    queryPosts: queryPosts
}