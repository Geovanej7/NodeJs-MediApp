import { PacientRepository } from "../repositories/PacientRepository";

const getAllPacient = async () => {
    return PacientRepository.getAllPacient();
}

const getPacient = async (id) => {
    return PacientRepository.getAllPacient(id);
}

const savePacient = async ({name, birthDate, email, phone }) => {
    return PacientRepository.savePacient({name, birthDate, email, phone });
}

const updatePacient = async (id,{name, birthDate, email, phone }) =>{
    return PacientRepository.updatePacient(id,{name, birthDate, email, phone });
}

const deletePacient = async (id) =>{
    return PacientRepository.deletePacient(id);
}

const pacientService = {
    getAllPacient,
    getPacient,
    savePacient,
    updatePacient,
    deletePacient
}

export default pacientService;