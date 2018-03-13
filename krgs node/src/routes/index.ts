import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

export class IndexRoute extends BaseRoute {
        constructor() {
          super();
        }

      //signup
      public static createData(router: Router, model: any) {
          router.post("/createData", (req: Request, res: Response, next: NextFunction) => {
              console.log("Signup data from UI",req.body);
               function username() {
                  let userData = new model.user(req.body);
                  var signupResolvedData = new Promise((resolve,reject)  => {
                      userData.save((err, data) => {
                          if(err) {
                            console.log('err',err);
                            reject(err)
                          } else {
                            console.log("resultData",data);
                            resolve(data);
                          }
                      });

                  });
                  return signupResolvedData;
              }
              username()
                .then((res) => {
                  console.log(res,'after resolve');
                });
            res.json({message:"signup sucess"})
        });
      }


      //Login
      public static getData(router: Router, model: any) {
          router.post("/getData", (req: Request, res: Response, next: NextFunction) => {
            function resolveAfter2Seconds() {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve('resolveAfter2Seconds');
                }, 1000);
              });
            }
              console.log("login data from UI",req.body);
             async function username() {
              var result = await resolveAfter2Seconds();
              console.log(result);
                var loginResolvedData = new Promise((resolve, reject) => {
                    model.user.findOne({name: req.body.name}, (err, data) => {
                        if (err) {
                            console.log('err', err);
                             reject(err)
                        } else if (data !== null) {
                            console.log("resultData", data);
                           resolve(data);
                        } else {
                            console.log('user not reg');
                        }
                    });

                });
                return loginResolvedData;
              }
              username()
                .then((res) => {
                    console.log(res,'after resolve');
                });
          });
        }




  }