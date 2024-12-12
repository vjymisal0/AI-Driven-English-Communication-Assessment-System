const express = require("express");
const cors = require("cors")
const mainroute = require('./route/index')
const assessmentroute = require('./route/assessment')
const videopage = require('./route/videopage')

const app = express();
app.use(cors())
app.use(express.json())

app.use('/', mainroute)
app.use('/assessment', assessmentroute);
app.use('/videopage', videopage);


app.listen(3000);