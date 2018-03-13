"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const users_1 = require("./schemas/users");
const index_1 = require("./routes/index");
let dbUrl = 'mongodb://localhost:27017/krgs';
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.model = {};
        this.app = express();
        this.config();
        this.routes();
        this.api();
    }
    api() {
    }
    config() {
        const MONGODB_CONNECTION = "mongodb://localhost:27017/krgsmarch";
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        try {
            let connection = mongoose.createConnection(MONGODB_CONNECTION);
            this.model.user = connection.model("User", users_1.userSchema);
            console.log('dbconnection sucess');
        }
        catch (err) {
            console.log('DBerr', err);
        }
        this.app.use('/', function (err, req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            next();
        });
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    routes() {
        let router;
        router = express.Router();
        index_1.IndexRoute.createData(router, this.model);
        index_1.IndexRoute.getData(router, this.model);
        this.app.use(router);
    }
}
exports.Server = Server;
