import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  // trang dang ky
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  // trang table
  router.get("/get-crud", homeController.displayGetCRUD);
  // update
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  // delete
  router.get("/delete-crud", homeController.deleteCRUD);

  //  ket noi react
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
