import express, { Router } from 'express'

interface Options{
    port?: number
    routes: Router
}
export class Server {

    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router


    constructor(options: Options) {
        const { port = 3100, routes } = options
        this.port = port
        this.routes = routes
    }


    async star() {
        //Middlewares
        this.app.use(express.json()) //Json input
        this.app.use(express.urlencoded({extended:true})) //URLencoded Input

        //Routes
        this.app.use(this.routes)
        
        //Port
        this.app.listen(this.port, () => console.log(`server runnig in ${this.port}`))
    }
}