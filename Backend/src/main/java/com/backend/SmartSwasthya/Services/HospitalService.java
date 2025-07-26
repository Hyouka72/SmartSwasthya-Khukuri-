package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Hospital createHospital(Hospital hospital) {
        // Add any specific validation here before saving
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    @Transactional
    public Optional<Hospital> updateHospital(Long id, Hospital updatedHospital) {
        return hospitalRepository.findById(id).map(hospital -> {
            hospital.setName(updatedHospital.getName());
            hospital.setAddress(updatedHospital.getAddress());
            hospital.setEmail(updatedHospital.getEmail());
            // Relationships (departments, doctors, patients) are typically managed
            // through their respective services, not directly updated here.
            return hospitalRepository.save(hospital);
        });
    }

    @Transactional
    public boolean deleteHospital(Long id) {
        if (hospitalRepository.existsById(id)) {
            hospitalRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


