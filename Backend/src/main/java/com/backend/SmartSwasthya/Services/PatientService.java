package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import com.backend.SmartSwasthya.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final HospitalRepository hospitalRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository, HospitalRepository hospitalRepository) {
        this.patientRepository = patientRepository;
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Patient createPatient(Patient patient) {
        if (patient.getHospital() == null || patient.getHospital().getId() == null) {
            throw new IllegalArgumentException("Hospital information is required for a patient.");
        }
        Hospital hospital = hospitalRepository.findById(patient.getHospital().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + patient.getHospital().getId() + " not found."));
        patient.setHospital(hospital);
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public List<Patient> getPatientsByHospitalId(Long hospitalId) {
        return patientRepository.findByHospitalId(hospitalId);
    }

    @Transactional
    public Optional<Patient> updatePatient(Long id, Patient updatedPatient) {
        return patientRepository.findById(id).map(existingPatient -> {
            existingPatient.setName(updatedPatient.getName());
            existingPatient.setPhone(updatedPatient.getPhone());
            existingPatient.setGender(updatedPatient.getGender());
            existingPatient.setAge(updatedPatient.getAge());

            if (updatedPatient.getHospital() != null && updatedPatient.getHospital().getId() != null) {
                Hospital hospital = hospitalRepository.findById(updatedPatient.getHospital().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + updatedPatient.getHospital().getId() + " not found for patient update."));
                existingPatient.setHospital(hospital);
            }
            return patientRepository.save(existingPatient);
        });
    }

    @Transactional
    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}