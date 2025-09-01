import { Pacient } from "../models/Pacient.js";

const getAllPacient = async () => {
    return await Pacient.find();
}

const getPacient = async (id) => {
    try {
        return await Pacient.findById(id);
    } catch (error) {
        throw new Error (error);
    }
}

const savePacient = async ({name, birthDate, email, phone }) => {
    try {
        const pacient = new Pacient({name, birthDate, email, phone });
        return await Pacient.save();
    } catch (error) {
        throw new Error (error);
    }
}

const updatePacient = async (id,{name, birthDate, email, phone }) => {
    try {
        return await Pacient.findByIdAndUpdate(id,{name, birthDate, email, phone }, {new: true});
    } catch (error) {
        throw new Error (error);
    }
}

const deletePacient = async (id) => {
    try {
        return await Pacient.findByIdAndUpdate(id);
    } catch (error) {
        throw new Error (error);
    }
}

const pacientRepository = {
    getAllPacient,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default pacientRepository;