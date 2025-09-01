import { PrescriptionRepository } from "../repositories/PrescriptionRepository";

const getAllPrescription = async () => {
    return PrescriptionRepository.getAllPrescription();
}

const getPrescription = async (id) => {
    return PrescriptionRepository.getAllPrescription(id);
}

const savePrescription = async ({date, appointmentId, medicine, dosage,instructions}) => {
    return PrescriptionRepository.savePrescription({date, appointmentId, medicine, dosage,instructions});
}

const updatePrescription = async (id,{date, appointmentId, medicine, dosage,instructions}) =>{
    return PrescriptionRepository.updatePrescription(id,{date, appointmentId, medicine, dosage,instructions});
}

const deletePrescription = async (id) =>{
    return PrescriptionRepository.deletePrescription(id);
}

const prescriptionService = {
    getAllPrescription,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default prescriptionService;

