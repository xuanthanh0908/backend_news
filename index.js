const express = require("express");
const app = express();
const newsRouter = require("./routers/news");
app.use(express.static("public"));
app.use(express.static("data/uploads/"));


app.use("/api",newsRouter); // localhost:5000/api/create

app.listen(5000,()=>{
    console.log("Port is listening !!!");
})