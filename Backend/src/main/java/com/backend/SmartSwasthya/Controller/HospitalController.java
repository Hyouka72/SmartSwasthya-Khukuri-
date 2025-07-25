package com.backend.SmartSwasthya.Controller;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.DoctorRepository;
import com.backend.SmartSwasthya.Services.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService service;

    @PostMapping
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital saved = service.saveHospital(hospital);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Hospital>> findAllHospitals() {
        return ResponseEntity.ok(service.findAllHospitals());
    }

}
