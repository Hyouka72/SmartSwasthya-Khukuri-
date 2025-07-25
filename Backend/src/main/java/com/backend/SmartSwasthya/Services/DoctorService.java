package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    DoctorRepository repo;

    //to Register a doctor
    public Doctor createDoctor(Doctor doctor) { return repo.save(doctor); }

    // to find all the registered doctor
    public List<Doctor> findAllDoctors() { return repo.findAll(); }

    //to find the doctor by Id
    public Doctor findDoctorById(long id) { return repo.findById(id).orElse(null); }

    //to delete an account
    public void deleteDoctor(Long id) { repo.deleteById(id); }
}
