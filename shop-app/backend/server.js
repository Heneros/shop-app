const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.post("/upload", (req, res) =>{
    setTimeout(() =>{
        console.log("File Upload");
        return res.status(200).json({ result: true, msg: 'file uploaded'});
    }, 3000);
});

app.delete("/upload", (req, res) =>{
    console.log('File Deleted');
    return res.status(200).json({ result: true, msg: 'file deleted'});
});

app.listen(8080, () =>{
    console.log("server running on port 8080")
})
