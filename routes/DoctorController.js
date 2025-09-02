import  express  from "express";
import  DoctorService  from "../services/DoctorService.js";
import bcrypt from 'bcrypt';

let router = express.Router();

router.get('/Doctors', async(req,res) =>{
    try {
        const doctor = await DoctorService.getAllDoctors();
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getDoctor/:id', async(req,res) =>{
    const{id}=req.params;
    try {
        const doctor = await DoctorService.getDoctor(id);
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/postDoctor/', async(req,res) =>{
    const{nome, login, password, medicalSpecialty, medicalRegistration, email, phone} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await DoctorService.saveDoctor({nome, login, password: hashedPassword, medicalSpecialty, medicalRegistration, email, phone});
        res.status(201).send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/Doctor/:id', async(req,res) =>{
    const{id}=req.params;
    const{nome, login, password, medicalSpecialty, medicalRegistration, email, phone} = req.body;
    try {
        const doctor = await DoctorService.updateDoctor(id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/Doctor/:id', async(req,res) =>{
    const{id}=req.params;
    try {
        const doctor = await DoctorService.deleteDoctor(id);
        res.send(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router;