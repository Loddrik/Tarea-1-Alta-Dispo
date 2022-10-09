import express from 'express';
import morgan  from 'morgan';

import sequelize from './db/database';
import routes  from './routes/crud';


class Server {
    private router;

    constructor() {
	this.router = express();

	this.config()
	this.routerConfig()
	this.dbInit()

    }

    private config() {
        this.router.use(express.urlencoded({ extended: false }));
        this.router.use(express.json());

        this.router.use(morgan('dev'));

        this.router.use((req, res, next) => {
            // set the CORS policy
            res.header('Access-Control-Allow-Origin', '*');
            // set the CORS headers
            res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

            next();
        });
    }

    private async dbInit() {
	try {
	    await sequelize.authenticate();
            console.log('[+] Connected to database');
	} catch (error) {
	    console.log(`[!] Unable to connect to the database: ${error}`);
	}
    }

    private routerConfig() { this.router.use('/', routes); }

    public start = (port: number) => {
	return new Promise((resolve, reject) => {
	    this.router.listen(port, () => resolve(port)) 
		.on('error', (err: Object) => reject(err));
	});
    }
}

const PORT: any  = process.env.PORT ?? 8080;
const starter = new Server().start(PORT)
    .then(  port  => console.log(`[+] Server listening on port ${port}`))
    .catch( error => console.log(`[!] Error - ${error}`))

export default starter;
