import  DoctorRepository  from "../repositories/DoctorRepository.js";

const getAllDoctors = async () => {
    return DoctorRepository.getAllDoctor();
}

const getDoctor = async (id) => {
    return DoctorRepository.getDoctor(id);
}

const saveDoctor = async ({nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    return DoctorRepository.saveDoctor({nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
}

const updateDoctor = async (id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) =>{
    return DoctorRepository.updateDoctor(id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
}

const deleteDoctor = async (id) =>{
    return DoctorRepository.deleteDoctor(id);
}

const doctorService = {
    getAllDoctors,
    getDoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor
}

export default doctorService;