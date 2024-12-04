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

        this.booksPath = "/api/books";
        this.authPath = "/api/auth";
        this.cartPath = "/api/cart";
        this.reviewsPath = "/api/reviews";

        this.middlewares();
        this.routes();
        connectDB();
    }

    routes(){
        this.app.use(this.booksPath, require("../routes/books"));
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.cartPath, require("../routes/cart"));
        this.app.use(this.reviewsPath, require("../routes/reviews"));

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