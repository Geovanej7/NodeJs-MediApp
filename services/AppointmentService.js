import { AppointmentRepository } from "../repositories/AppointmentRepository";

const getAllApointment = async () => {
    return AppointmentRepository.getAllApointment();
}

const getApointment = async (id) => {
    return AppointmentRepository.getAllApointment(id);
}

const saveApointment = async ({date, doctorId, pacientId}) => {
    return AppointmentRepository.saveApointment({date, doctorId, pacientId});
}

const updateApointment = async (id,{date, doctorId, pacientId}) =>{
    return AppointmentRepository.updateApointment(id,{date, doctorId, pacientId});
}

const deleteApointment = async (id) =>{
    return AppointmentRepository.deleteApointment(id);
}

const appointmentService = {
    getAllApointment,
    getApointment,
    saveApointment,
    updateApointment,
    deleteApointment
}

export default appointmentService;