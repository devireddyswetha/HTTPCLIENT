import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import errorHandler = require("errorhandler");
import mongoose = require("mongoose"); //import mongoose
//import { IUserModel } from "./model/user"; //import IUserModel
//routes
import { IUserModel, IModel } from "./model/usres"; //import IUserModel
import { userSchema } from "./schemas/users"; //import userSchema

import { IndexRoute } from "./routes/index";
let dbUrl = 'mongodb://localhost:27017/krgs';
/**
 * The server.
 *
 * @class Server
 */
export class Server {

  private model: IModel;

  public app: express.Application;

  // private model: IModel; //an instance of IModel

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.model = {} as IModel;
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */

  public config() {
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/krgsmarch";

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");



    //mount json form parser
    this.app.use(bodyParser.json());
    this.app.use(cors())
    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    try {
      //connect to mongoose
      let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
      //create models
      this.model.user = connection.model<IUserModel>("User", userSchema);
      console.log('dbconnection sucess', );
    } catch (err) {
      console.log('DBerr', err);
    }

    //create models
   // this.model.user = connection.model<IUserModel>("User", userSchema);

    this.app.use('/', function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.createData(router, this.model);
    IndexRoute.getData(router, this.model);

    //use router middleware
    this.app.use(router);
  }

}