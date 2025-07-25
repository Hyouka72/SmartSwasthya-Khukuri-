package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import com.backend.SmartSwasthya.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {
    @Autowired
    private HospitalRepository repo;

    //Create
    public Hospital saveHospital(Hospital hospital) {
        return repo.save(hospital);
    }

    //Read all
    public List<Hospital> findAllHospitals() {
        return repo.findAll(); }

    //update
    public Hospital updateHospital(long id,Hospital hospital) {
        Hospital existingHospital = repo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Hospital no found"+ id));
        existingHospital.setName(hospital.getName());
        existingHospital.setAddress(hospital.getAddress());
        existingHospital.setEmail(hospital.getEmail());

        return repo.save(existingHospital);
    }


    //Read by ID
    public Hospital findHospitalById(long id) {
        return repo.findById(id).orElse(null);
    }

    //Delete by ID
    public void deleteHospital(Long id) {
        repo.deleteById(id);
    }


}
