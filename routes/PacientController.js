import { express } from "express";
import { PacientService } from "../services/PacientService";

let router = express.Router();

router.get('/pacients', async(req,res) =>{
    try {
        const pacient = await PacientService.getAllPacient();
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/getPacient/:id', async(req,res) =>{
    const{id}=req.params;
    try {
        const pacient = await PacientService.getPacient(id);
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/postPacient/', async(req,res) =>{
    const{name, birthDate, email, phone } = req.body;
    try {
        const pacient = await PacientService.savePacient({name, birthDate, email, phone });
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/pacient/:id', async(req,res) =>{
    const{id}=req.params;
    const{name, birthDate, email, phone } = req.body;
    try {
        const pacient = await PacientService.updatePacient(id,{name, birthDate, email, phone });
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/pacient/:id', async(req,res) =>{
    const{id}=req.params;
    try {
        const pacient = await PacientService.deletePacient(id);
        res.send(pacient);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

export default router();