/**
 * name
 */
import * as express from 'express';

class Server {
    private settings
    constructor(settings) {
        this.settings=settings;
    }
    public onSnooze
    start(){
        var app = express()
        app.use(express.static('.'))
        app.post('/snooze', (req, res)=>{
            this.onSnooze();
            res.send({"ok":true})
        }) 
        app.get('/info', (req, res)=>{
            res.send({
                "from":this.settings.from,
                "to":this.settings.to,
                "is_snooze_enabled":this.settings.is_snooze_enabled||false
            });
        })
        app.listen(this.settings.port, ()=>{
            console.log('Example app listening on port '+this.settings.port+'!')
        })
    }
}

export default Server;
export {Server};
