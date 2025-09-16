import  express  from "express";
import  appointmentController  from "./AppointmentController.js";
import  doctorController  from "./DoctorController.js";
import  pacientController  from "./PacientController.js";
import  prescriptionController  from "./PrescriptionController.js";
import doctorService from "../services/DoctorService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken from "../middleware/authMiddleware.js";

let router = express.Router();

router.get(
    "/", function (req, res){
        console.log("Ok");
        res.status(200).json({message: "Ok!"});
    }
);

//mapeamento do login
router.post('/login', async (req,res) => {
    try {
        const {login, password} = req.body;
        const doctor = await doctorService.getDoctorByLogin(login);
        if (!doctor) {
            return res.status(401).json({error: 'Autentication failed!'});
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({error: 'Autentication failed!'});
        }

        const token = JsonWebTokenError.sign({doctorId: doctor._id}, 'you-secret-key',{
            expiresIn: '1hr',
        });
        res.status(200).json({token});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'login failed!'});
    }
});

router.use("/", verifyToken, appointmentController )
router.use("/", verifyToken, doctorController )
router.use("/", verifyToken, pacientController )
router.use("/", verifyToken, prescriptionController )

export default router;