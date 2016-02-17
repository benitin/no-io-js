//sql.js
var sql = require('mssql')
var dbconfig = {
	server: "localhost",
	database: "dbseguridad",
	user: "sa",
	password: "123",
	port: 1433
}

function getUsers(){
	var conn = new sql.Connection(dbconfig)
	var req  = new sql.Request(conn)

	conn.connect(function(err){
		if(err){
			console.log(err)
			return
		}
		req.query("SELECT  * FROM Usuario", function(err, recorset){
			if(err){
				console.log(err)
			}else{
				console.log(recorset)
			}
			conn.close()
		})
	})
}

getUsers()