const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const nconf = require("nconf");

const config = nconf.env()
    .defaults({port: 3001})
    .get();

const router = express.Router();

router.get("/:slug/test", function(req, res) {
    res.json({
        params: req.params
    });
});

const app = express();
app.set('port', config.port);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/base", router);


app.listen(config.port, function(){
    console.log("listening on port:" + config.port)
});
