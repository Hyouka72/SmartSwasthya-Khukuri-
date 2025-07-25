package com.backend.SmartSwasthya.Controller;

import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Services.PatientReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class PatientReportContoller {

    @Autowired
    private PatientReportService service;

    @PostMapping("/upload")
    public PatientReport uploadReport(@RequestBody PatientReport report) {
        return service.uploadReport(report);
    }

    @GetMapping("/patient/{patientId}")
    public List<PatientReport> getReportsByPatient(@PathVariable Long patientId) {
        return service.getReportsByPatientId(patientId);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        service.deleteReport(id);
    }
}
