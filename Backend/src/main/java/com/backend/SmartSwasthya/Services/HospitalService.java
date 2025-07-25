package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {
    @Autowired
    private HospitalRepository repo;

    //Create or Update
    public Hospital saveHospital(Hospital hospital) {
        return repo.save(hospital);
    }

    //Read all
    public List<Hospital> findAllHospitals() {
        return repo.findAll(); }

    //Read by ID
    public Hospital findHospitalById(long id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteHospital(Long id) {
        repo.deleteById(id);
    }


}
