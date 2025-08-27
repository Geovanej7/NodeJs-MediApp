import { express } from "express";

let router = express.Router();

router.get(
    "/", function (req, res){
        console.log("Ok");
        res.status(200).json({message: "Ok!"});
    }
);

export default router;