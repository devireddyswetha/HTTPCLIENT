"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var errorHandler = require("errorhandler");
var mongoose = require("mongoose"); //import mongoose
var users_1 = require("./schemas/users"); //import userSchema
var index_1 = require("./routes/index");
var dbUrl = 'mongodb://localhost:27017/krgs';
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        this.model = {};
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    // private model: IModel; //an instance of IModel
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        //empty for now
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        var MONGODB_CONNECTION = "mongodb://localhost:27017/krgsmarch";
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        try {
            //connect to mongoose
            var connection = mongoose.createConnection(MONGODB_CONNECTION);
            //create models
            this.model.user = connection.model("User", users_1.userSchema);
            console.log('connection', connection);
        }
        catch (err) {
            console.log('DBerr', err);
        }
        //create models
        // this.model.user = connection.model<IUserModel>("User", userSchema);
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        //IndexRoute
        index_1.IndexRoute.createData(router, this.model);
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
