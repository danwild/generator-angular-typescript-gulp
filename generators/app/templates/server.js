var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

// serves all nested static files
app.use(express.static("public/src/app"));
app.use(express.static("public"));

app.listen(port, function(err){
	console.log("running server on port "+ port);
});