package com.backend.SmartSwasthya.Controller;


import com.backend.SmartSwasthya.Models.Paitent;
import com.backend.SmartSwasthya.Services.PaitentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Patients")
public class PaitentController {

    @Autowired
    PaitentService service;


    //Add paitents
    @PostMapping
    public ResponseEntity<Paitent> addPaitent(@RequestBody Paitent paitent) {
        Paitent saved = service.CreatePaitent(paitent);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }


    //Get All Paitents
    @GetMapping
    public ResponseEntity<List<Paitent>> findAllPaitents() {
        return new ResponseEntity<>(service.findAllPaitents(), HttpStatus.OK);
    }

    //Get By Id
    @GetMapping("/{id}")
    public ResponseEntity<Paitent> findPaitentById(@PathVariable long id) {
        return new ResponseEntity<>(service.GetPaitent(id), HttpStatus.OK);
    }

    //Delete Paitent By id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        // Call your service to delete the patient by ID
        service.DeletePaitent(id);

        // Return 204 No Content to indicate successful deletion
        return ResponseEntity.noContent().build();
    }

    //Update Paitent By id
    @PutMapping({"/{id}"})
    public ResponseEntity<Paitent> updatePaitent(@PathVariable Long id, @RequestBody Paitent paitent) {
        Paitent updated = service.updatePaitent(id, paitent);
        return new ResponseEntity<>(updated, HttpStatus.CREATED);
    }



}
