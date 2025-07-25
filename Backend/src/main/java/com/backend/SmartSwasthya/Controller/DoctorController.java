package com.backend.SmartSwasthya.Controller;

import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired DoctorService service;

    @PostMapping
    public Doctor create(@RequestBody Doctor doctor) {
        return service.createDoctor(doctor);
    }

    @GetMapping(" /{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = service.findDoctorById(id);
        return ResponseEntity.ok(doctor);

    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = service.findAllDoctors();
        return ResponseEntity.ok(doctors);
    }
    // Add update and delete endpoints
}
