/**
 * name
 */
import * as express from 'express';

class Server {
    private settings
    constructor(settings) {
        this.settings=settings;
    }
    start(){
        var app = express()
        app.use(express.static('.'))
        app.post('/snooze', function (req, res) {
            res.send('Hello World!');
        })
        app.get('/info', (req, res)=>{
            res.send({
                "from":this.settings.from,
                "to":this.settings.to
            });
        })
        app.listen(this.settings.port, ()=>{
            console.log('Example app listening on port '+this.settings.port+'!')
        })
    }
}

export default Server;
export {Server};
