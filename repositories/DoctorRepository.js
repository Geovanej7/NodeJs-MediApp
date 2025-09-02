import  Doctor  from "../models/Doctor.js";

const getAllDoctor = async () => {
    return await Doctor.find();
}

const getDoctor = async (id) => {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        throw new Error (error);
    }
}

const saveDoctor = async ({nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    try {
        const doctor = new Doctor({nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
        return await doctor.save();
    } catch (error) {
        throw new Error (error);
    }
}

const updateDoctor = async (id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone}) => {
    try {
        return await Doctor.findByIdAndUpdate(id,{nome, login, password, medicalSpecialty, medicalRegistration, email, phone});
    } catch (error) {
        throw new Error (error);
    }
}

const deleteDoctor = async (id) => {
    try {
        return await Doctor.findByIdAndDelete(id);
    } catch (error) {
        throw new Error (error);
    }
}

const doctorRepository = {
getAllDoctor,
getDoctor,
saveDoctor,
updateDoctor,
deleteDoctor
}

export default doctorRepository;