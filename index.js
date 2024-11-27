// here we are creating a cluster
//how many cluster we can make we can make how many core of cpu are there and we can create upto total cpu instance 

const cluster = require('node:cluster');
const os = require('os');
const express = require('express');
const app = express();
const totalCpu = os.cpus().length;

//this is the primary server or main server that create instances of the server of total cpu in our system
if (cluster.isPrimary) {
    console.log(`Primary Server is running in port ${process.pid}`)
    for (let i = 0; i < totalCpu; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();  // Optional: Restart the worker
    });

    //if cluster wala cpu sara bhargya suppose than uska bad apna server chlega 
} else {
    app.get('/', (req, res) => {
        res.status(200).send(`Process running on server with PID: ${process.pid}`);
    });

    app.listen(3000, () => {
        console.log('Server started at port 3000');
    });
}
