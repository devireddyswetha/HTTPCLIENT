"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    constructor() {
        super();
    }
    static createData(router, model) {
        router.post("/createData", (req, res, next) => {
            console.log("Signup data from UI", req.body);
            function username() {
                let userData = new model.user(req.body);
                var signupResolvedData = new Promise((resolve, reject) => {
                    userData.save((err, data) => {
                        if (err) {
                            console.log('err', err);
                            reject(err);
                        }
                        else {
                            console.log("resultData", data);
                            resolve(data);
                        }
                    });
                });
                return signupResolvedData;
            }
            username()
                .then((res) => {
                console.log(res, 'after resolve');
            });
            res.json({ message: "signup sucess" });
        });
    }
    static getData(router, model) {
        router.post("/getData", (req, res, next) => {
            function resolveAfter2Seconds() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolveAfter2Seconds');
                    }, 1000);
                });
            }
            console.log("login data from UI", req.body);
            function username() {
                return __awaiter(this, void 0, void 0, function* () {
                    var result = yield resolveAfter2Seconds();
                    console.log(result);
                    var loginResolvedData = new Promise((resolve, reject) => {
                        model.user.findOne({ name: req.body.name }, (err, data) => {
                            if (err) {
                                console.log('err', err);
                                reject(err);
                            }
                            else if (data !== null) {
                                console.log("resultData", data);
                                resolve(data);
                            }
                            else {
                                console.log('user not reg');
                            }
                        });
                    });
                    return loginResolvedData;
                });
            }
            username()
                .then((res) => {
                console.log(res, 'after resolve');
            });
        });
    }
}
exports.IndexRoute = IndexRoute;
