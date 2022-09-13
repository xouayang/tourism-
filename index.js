const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose')
const fs = require('fs')
const app = express();
const upload = require('./multer')
const cloudinary = require('./src/config/cloudinary.config')
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: "5mb", extended: true }));

// connect DB
const url = process.env.URL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Successed")
}).catch((error) => {
    console.log(`Not found Database : ${error}`)
})


// upload images

app.use('/upload-image',upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    if(req.method === "POST") {
        const urls = []
        const files = req.files

        for(const file of files) {
            const {path} = file
            const newPath = await uploader(path)
            urls.push(newPath)

            fs.unlinkSync(path)
        }
        return res.status(200).json({
            message:"Image Successfully to uploaded",
            data:urls
        })
    } else {
        return res.status(405).json({
          err:"Images not uploaded successfully"
        })
    }
})

// Start api
const allRouter = require('./src/router/all.router');
app.use('/api',allRouter)

const port = process.env.PORTS;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


