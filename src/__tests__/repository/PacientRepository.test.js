import Pacient from "../../models/Pacient.js";
import PacientRepository from "../../repositories/PacientRepository.js";
import db from "../../src/database/setup.js";

const name = "Maria";
const birthDate = "1980-01-10";
const email = "maria@gg.com";
const phone = "11 98877-2201";

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("Pacient Repository Test", () => {
  it("Should create Pacient successfully when correct values are inserted", async () => {
    const pacient = new Pacient({ name, birthDate, email, phone });

    const expectedPacient = await PacientRepository.savePacient(pacient);

    expect(expectedPacient.name).toBe(name);
    expect(expectedPacient.birthDate.toISOString()).toBe("1980-01-10T00:00:00.000Z");
    expect(expectedPacient.email).toBe(email);
    expect(expectedPacient.phone).toBe(phone);
  });

  it("Should receive error when missing name", async () => {
  const name = null;
  const pacient = new Pacient({ name, birthDate, email, phone });

  await expect(async () => {
    await PacientRepository.savePacient(pacient);
  }).rejects.toThrow(new Error("ValidationError: name: Pacient name is required."));
});

it("Should receive error when missing birth date", async () => {
  const birthDate = null;
  const pacient = new Pacient({ name, birthDate, email, phone });

  await expect(async () => {
    await PacientRepository.savePacient(pacient);
  }).rejects.toThrow(new Error("ValidationError: birthDate: Birth Date is required."));
});

it("Should receive error when missing email", async () => {
  const email = null;
  const pacient = new Pacient({ name, birthDate, email, phone });

  await expect(async () => {
    await PacientRepository.savePacient(pacient);
  }).rejects.toThrow(new Error("ValidationError: email: Patient email is required."));
});

it("Should validate phone format", async () => {
  const phone = "11988772201"; // formato inválido (sem separador)
  const pacient = new Pacient({ name, birthDate, email, phone });

  await expect(async () => {
    await PacientRepository.savePacient(pacient);
  }).rejects.toThrow(
    new Error("ValidationError: phone: 11988772201 This is not a valid phone value. Please use the format (99) 99999-9999.")
  );
});

});