import express, {Router} from "express";

const router: Router = express.Router();
const urlencodedParser: any =  express.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    res.render(
        'index',
        {
            title: 'Musical Instrument Inventory App'
        }
    );
    next();
});


export = router;
