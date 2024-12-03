const express = require("express");
const cors = require("cors");
const connectDB = require("./database")

class Server {

    constructor(){
        this.port = process.env.PORT || 8080;
        this.app = express();
        this.corsOptions = {
            origin: [
                process.env.FRONTEND_URL
            ]
        };

        this.usersPath = "/api/users";
        this.tvShowsPath = "/api/tvshows";
        this.authPath = "/api/auth";

        this.middlewares();
        this.routes();
        connectDB();
    }

    routes(){
        this.app.use(this.tvShowsPath, require("../routes/tvshows"));
        this.app.use(this.usersPath, require("../routes/user"));
        this.app.use(this.authPath, require("../routes/auth"));

        this.app.get("*", function(req, res) {
            res.status(404).json({
                msg: "Ruta no encontrada",
                result: 12345
            })
        });
        
        this.app.post("*", function(req, res) {
            res.status(404).json({
                msg: "Ruta no encontrada",
                result: 12345
            })
        });
    }

    middlewares(){
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor escuchando en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;