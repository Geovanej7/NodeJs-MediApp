import  PrescriptionRepository  from "../repositories/PrescriptionRepository.js";
import AppointmentService from "../services/AppointmentService.js"
import PacientService from "../services/PacientService.js"
import DoctorService from "../services/DoctorService.js"
import PDFDocument from "pdfkit";
import fs from "fs";


const getAllPrescription = async () => {
    return PrescriptionRepository.getAllPrescription();
}

const getPrescription = async (id) => {
    return PrescriptionRepository.getAllPrescription(id);
}

const savePrescription = async ({date, appointmentId, medicine, dosage,instructions}) => {
    return PrescriptionRepository.savePrescription({date, appointmentId, medicine, dosage,instructions});
}

const updatePrescription = async (id,{date, appointmentId, medicine, dosage, instructions, file}) =>{
    return PrescriptionRepository.updatePrescription(id,{date, appointmentId, medicine, dosage, instructions, file});
}

const deletePrescription = async (id) =>{
    return PrescriptionRepository.deletePrescription(id);
}

const generatePrescriptionFile = async (prescription) => {
    const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
    const pacient = await PacientService.getPacient(appointment.pacientId);
    const doctor = await DoctorService.getDoctor(appointment.doctorId);

    const id = prescription._id;
    const document = new PDFDocument({font: 'Currier'});
    const filePath = ".medi-app\NodeJs-MediApp\prescriptions" + id + ".pdf"; //lembrar de por o caminho de acordo onde o projeto esta na sua máquina

    document.pipe(fs.createWriteStream(filePath));
    document.fontSize(16).text("Pacient Name: " + pacient.name);
    document.fontSize(16).text("Doctor Name: " + doctor.name);

    const recipe = "Medicine: " + prescription.medicine;
    document.fontSize(12).text(recipe);
    
    document.fontSize(12).text("Dose: " + prescription.dosage);
    document.fontSize(12).text("Instructions: " + prescription.instructions);

    return prescription;

}

const prescriptionService = {
    getAllPrescription,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription,
    generatePrescriptionFile
}

export default prescriptionService;

