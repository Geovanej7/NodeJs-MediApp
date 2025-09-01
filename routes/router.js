import  express  from "express";
import  appointment  from "./AppointmentController.js";
import  doctorController  from "./DoctorController.js";
import  pacientController  from "./PacientController.js";
import  prescriptionController  from "./PrescriptionController.js";

let router = express.Router();

router.get(
    "/", function (req, res){
        console.log("Ok");
        res.status(200).json({message: "Ok!"});
    }
);

router.use("/", appointment )
router.use("/", doctorController )
router.use("/", pacientController )
router.use("/", prescriptionController )

export default router;