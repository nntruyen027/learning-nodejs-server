const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');




const viewUploadForm = fs.readFileSync('./viewUploadForm.html');

http.createServer((req, res) => {

    if (req.url == '/upload' && req.method == 'POST') {
        const form = new formidable.IncomingForm({
            uploadDir: '.'
        });

        const options = {};

        form.parse(req, function (err, fields, files) {
            if (err) throw err;

            let oldPath = files.files.filepath;

            let newPath = path.join(__dirname, files.files.originalFilename);
            console.log(newPath);

            fs.rename(oldPath, newPath, err => {
                if (err)
                    throw err

                return res.end('<h1 style="color: green;">Upload success !</h1>');
            });
        })
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(viewUploadForm);
    }
}).listen(6969);