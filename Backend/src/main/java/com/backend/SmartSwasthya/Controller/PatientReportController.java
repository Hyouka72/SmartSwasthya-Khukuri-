package com.backend.SmartSwasthya.Controller;

import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Services.PatientReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/patient-reports")

public class PatientReportController {

    private final PatientReportService patientReportService;

    @Autowired
    public PatientReportController(PatientReportService patientReportService) {
        this.patientReportService = patientReportService;
    }

    @PostMapping("/upload")
    public ResponseEntity<PatientReport> uploadPatientReport(
            @RequestParam("patientId") Long patientId,
            @RequestParam("reportType") String reportType,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "uploadedBy", required = false) String uploadedBy) { // uploadedBy can be optional
        try {
            PatientReport report = patientReportService.uploadReport(patientId, reportType, file, uploadedBy);
            return new ResponseEntity<>(report, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            // Catch more general runtime errors, e.g., Cloudinary upload failure
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PatientReport>> getReportsByPatientId(@PathVariable Long patientId) {
        List<PatientReport> reports = patientReportService.getReportsByPatientId(patientId);
        if (reports.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Or HttpStatus.NO_CONTENT
        }
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientReport> getReportById(@PathVariable Long id) {
        return patientReportService.getReportById(id)
                .map(report -> new ResponseEntity<>(report, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        if (patientReportService.deleteReport(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
