import  AppointmentRepository  from "../repositories/AppointmentRepository.js";

const getAllAppointment = async () => {
    return AppointmentRepository.getAllAppointment();
}

const getAppointment = async (id) => {
    return AppointmentRepository.getAllAppointment(id);
}

const saveAppointment = async ({date, doctorId, pacientId}) => {
    return AppointmentRepository.saveAppointment({date, doctorId, pacientId});
}

const updateAppointment = async (id,{date, doctorId, pacientId}) =>{
    return AppointmentRepository.updateAppointment(id,{date, doctorId, pacientId});
}

const deleteAppointment = async (id) =>{
    return AppointmentRepository.deleteAppointment(id);
}

const appointmentService = {
    getAllAppointment,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentService;