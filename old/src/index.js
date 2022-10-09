"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./db/database"));
const crud_1 = __importDefault(require("./routes/crud"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.router.listen(port, () => resolve(port))
                    .on('error', (err) => reject(err));
            });
        };
        this.router = (0, express_1.default)();
        this.config();
        this.routerConfig();
        this.dbInit();
    }
    config() {
        this.router.use(express_1.default.urlencoded({ extended: false }));
        this.router.use(express_1.default.json());
        this.router.use((0, morgan_1.default)('dev'));
        this.router.use((req, res, next) => {
            // set the CORS policy
            res.header('Access-Control-Allow-Origin', '*');
            // set the CORS headers
            res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
            next();
        });
    }
    dbInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.authenticate();
                console.log('[+] Connected to database');
            }
            catch (error) {
                console.log(`[!] Unable to connect to the database: ${error}`);
            }
        });
    }
    routerConfig() { this.router.use('/', crud_1.default); }
}
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
const starter = new Server().start(PORT)
    .then(port => console.log(`[+] Server listening on port ${port}`))
    .catch(error => console.log(`[!] Error - ${error}`));
exports.default = starter;
