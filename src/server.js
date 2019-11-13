const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const nconf = require("nconf");
const jwt = require("jsonwebtoken");

const config = nconf.env()
    .defaults({port: 3001})
    .get();



const app = express();
app.set('port', config.port);
app.use(bodyParser.json());
app.use(morgan("dev"));


/**
 * Auth Endpoint
 * @type {string}
 */
const privateKey = "shhh";
app.get("/token/:slug", function(req, res){
    const slug = req.params.slug;
    const token = jwt.sign({slug: slug}, privateKey);
    res.json({
        token: token
    });
});

/**
 * previewer domain
 * @type {Router|router}
 */
const router = express.Router();
router.get("/:slug/test", function(req, res) {
    const subDomain = req.params.slug;
    var decoded;
    try {
        decoded = jwt.verify(req.get("Token"), privateKey)
    } catch (e) {
        res.status(403);
        res.json({msg:"invalid token"});
        return;
    }

    if(decoded.slug !== subDomain) {
        res.status(403);
        res.json({msg:"invalid domain token"});
        return;
    }

    res.json({
        params: req.params
    });
});

app.use("/base", router);



app.listen(config.port, function(){
    console.log("listening on port:" + config.port)
});
