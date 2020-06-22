const express = require('express');
const app = express();
var cors = require('cors')

const port = 3000
const fs = require('fs')
const fileUpload = require('express-fileupload');

app.use(fileUpload())

app.get('/read-file', (req, res, next) => {


});

var corsOptions = {
    origin: 'http://localhost:3002',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/upload-file', cors(corsOptions), (req, res, next) => {

    const dir = __dirname + '/upload';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const file = req.files.file;
    console.log('==file===', file);

    fs.writeFile(`./upload/${file.name}`, file.data, 'utf8', (error, writeResult) => {
        if (error) {
            res.send({
                status: false,
                message: 'File upload failed'
            })
        }
        else {
            fs.readFile(`./upload/${file.name}`, 'utf8', (readFileError, result) => {
                if (readFileError) {
                    res.send({
                        status: false,
                        message: 'File read failed'
                    })
                }
                console.log('==result===', decodeURI(result));

                res.json({
                    status: true,
                    message: "File upload successfully!",
                    entity: result.replace(/[\u{0080}-\u{FFFF}]/gu, "")
                })
            })
        }
    })
});

app.listen(port, () => console.log(`server listening to port : ${port}`));