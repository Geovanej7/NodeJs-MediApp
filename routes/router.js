import { express } from "express";
import { appointment } from "./AppointmentController";
import { doctorController } from "./DoctorController";
import { pacientController } from "./PacientController";
import { prescriptionController } from "./PrescriptionController";

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