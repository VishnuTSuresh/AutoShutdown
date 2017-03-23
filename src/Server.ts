/**
 * name
 */
var express = require('express')

class Server {
    constructor() {
        
    }
    start(){
        var app = express()
        app.use(express.static('.'))
        app.post('/snooze', function (req, res) {
            res.send('Hello World!')
        })

        app.listen(3000, function () {
            console.log('Example app listening on port 3000!')
        })
    }
}

export default Server;
export {Server};
