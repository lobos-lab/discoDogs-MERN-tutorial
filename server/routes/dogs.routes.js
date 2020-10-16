const DogController = require("../controllers/dogs.controllers");

function showRoute(req, res, next){
    console.log("2: ", req.route.methods);
    next();
};

module.exports = (app) => {
    app.get("/api/dogs", showRoute, DogController.index);
    app.post("/api/dogs", showRoute, DogController.create);
    app.get("/api/dogs/random", showRoute, DogController.random);
    app.get("/api/dogs/:id", showRoute, DogController.show);
    app.put("/api/dogs/:id", showRoute, DogController.update);
    app.post("/api/dance/:id", showRoute, DogController.boogie);
    app.delete("/api/dogs/:id", showRoute, DogController.adopt)
}

