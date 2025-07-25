package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Paitent;
import com.backend.SmartSwasthya.Repository.PaitentRepository;
import com.backend.SmartSwasthya.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaitentService {

    @Autowired
    PaitentRepository repo;

    public Paitent CreatePaitent(Paitent paitent) {
        return repo.save(paitent);
    }

    public Paitent GetPaitent(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Paitent> findAllPaitents() {
        return repo.findAll();
    }

    public Paitent updatePaitent(Long id, Paitent newData) {
        Paitent existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        existing.setName(newData.getName());
        existing.setAge(newData.getAge());
        existing.setPhone(newData.getPhone());
        existing.setGender(newData.getGender());
        existing.setHospital(newData.getHospital());
        existing.setMedicalReportUrl(newData.getMedicalReportUrl());

        return repo.save(existing);
    }

    public void DeletePaitent(Long id) {
        Paitent paitent = repo.findById(id).orElse(null);
    }
}
