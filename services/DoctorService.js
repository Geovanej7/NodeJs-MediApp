import { DoctorRepository } from "../repositories/DoctorRepository";

const getAllDoctors = async () => {
    return DoctorRepository.getAllDoctor();
}

const getADoctor = async (id) => {
    return DoctorRepository.getAllDoctor(id);
}

const saveDoctor = async ({nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    return AppointmentRepository.saveDoctor({nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
}

const updateDoctor = async (id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) =>{
    return AppointmentRepository.updateApointment(id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
}

const deleteDoctor = async (id) =>{
    return AppointmentRepository.deleteApointment(id);
}

const doctorService = {
    getAllDoctors,
    getADoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor
}

export default doctorService;