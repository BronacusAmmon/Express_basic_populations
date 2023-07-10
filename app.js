'use strict';
//Always Necessary
const express = require("express"),
	bodyParser = require("body-parser"),
	cluster = require('cluster'),
	cpuCount = require('os').cpus().length;


//routes
const state = require('./routes/state');

if(cluster.isMaster){
	for(let i = 0; i < cpuCount; i++){
		cluster.fork();
	}
	cluster.on('online', (worker) =>{
		console.log(`Worker: ${worker.process.pid} has been spawned`)
	})
	cluster.on('exit', (worker) =>{
		console.log(`Worker ${worker.process.pid} died, new fork`)
		cluster.fork();
	})

} else { 

//express configs
const port = 5555;
const app = express();

//middleware
app.use(bodyParser.text())

//routes
app.use("/api/population", state);
app.use("*", (_, res) => {res.status(400).json({message:"Invalid API"})})

//listener
app.listen(port, (err) => {
	if(!err){
		console.log(`listening on port ${port}`)
	}
	else{
		console.log(`Error ${err} occured when trying to start server`)
	}
});
}