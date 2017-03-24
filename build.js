var fs = require('fs');
var files=["settings.json","start.vbs","index.html"];
files.forEach((file)=>{
    fs.createReadStream('./src/'+file).pipe(fs.createWriteStream('./dist/'+file));
})
