const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const creatController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/test/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    creatController.signup
  );
  app.get(
    "/api/test/find/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findUser
  );

  app.put(
    "/api/test/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/test/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
