"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
/**
 * / route
 *
 * @class User
 */
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    // public static create(router: Router) {
    //   //log
    //   console.log("[IndexRoute::create] Creating index route.");
    //
    //   //add home page route
    //   router.get("/", (req: Request, res: Response, next: NextFunction) => {
    //     new IndexRoute().index(req, res, next);
    //   });
    // }
    function IndexRoute() {
        return _super.call(this) || this;
    }
    IndexRoute.createData = function (router, model) {
        router.post("/createData", function (req, res, next) {
            console.log("Post data");
            console.log("req", req.body);
            var userData = new model.user(req.body);
            userData.save(function (err, data) {
                if (err) {
                    console.log('err', err);
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            });
        });
    };
    return IndexRoute;
}(route_1.BaseRoute));
exports.IndexRoute = IndexRoute;
