import  Appointment  from "../models/Appointment.js";

const getAllApointment = async () => {
    return await Appointment.find();
}

const getApointment = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw new Error (error);
    }
}

const saveApointment = async ({date, doctorId, pacientId}) => {
    try {
        const prescription = new Appointment({date, doctorId, pacientId});
        return await Appointment.save();
    } catch (error) {
        throw new Error (error);
    }
}

const updateApointment = async (id,{date, doctorId, pacientId}) => {
    try {
        return await Appointment.findByIdAndUpdate(id,{date, doctorId, pacientId}, {new: true});
    } catch (error) {
        throw new Error (error);
    }
}

const deleteApointment = async (id) => {
    try {
        return await Appointment.findByIdAndUpdate(id);
    } catch (error) {
        throw new Error (error);
    }
}


const appointmentRepository = {
    getAllApointment,
    getApointment,
    saveApointment,
    updateApointment,
    deleteApointment
}

export default appointmentRepository;