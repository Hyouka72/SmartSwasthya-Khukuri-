package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Repository.PatientReportRepository;
import com.backend.SmartSwasthya.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional; // Added for transactional upload

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PatientReportService {

    private final PatientReportRepository patientReportRepository; // Corrected typo
    private final PatientRepository patientRepository;
    private final CloudinaryImageService cloudinaryImageService; // Inject CloudinaryImageService

    @Autowired
    public PatientReportService(
            PatientReportRepository patientReportRepository,
            PatientRepository patientRepository,
            CloudinaryImageService cloudinaryImageService) {
        this.patientReportRepository = patientReportRepository;
        this.patientRepository = patientRepository;
        this.cloudinaryImageService = cloudinaryImageService;
    }

    @Transactional // Ensure the transaction covers both upload and save
    public PatientReport uploadReport(Long patientId, String reportType, MultipartFile file, String uploadedBy) {
        // 1. Find the patient
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

        // 2. Upload image to Cloudinary
        Map<String, Object> uploadResult; // Use Map<String, Object> to correctly cast the result
        try {
            uploadResult = cloudinaryImageService.upload(file);
        } catch (RuntimeException e) { // Catch the RuntimeException thrown by CloudinaryImageServiceImpl
            throw new RuntimeException("Failed to upload report file to Cloudinary: " + e.getMessage(), e);
        }

        String reportUrl = (String) uploadResult.get("url"); // Get the URL from the Cloudinary response

        // 3. Create a new PatientReport object
        PatientReport report = new PatientReport();
        report.setPatient(patient);
        report.setReportType(reportType);
        report.setReportUrl(reportUrl); // Set the Cloudinary URL here
        report.setUploadedBy(uploadedBy);
        report.setUploadedDate(LocalDate.now());

        // 4. Save the report to the database
        return patientReportRepository.save(report);
    }

    public List<PatientReport> getReportsByPatientId(Long patientId) {
        // Validate patient existence if necessary, otherwise findByPatientId is enough
        // patientRepository.findById(patientId).orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));
        return patientReportRepository.findByPatientId(patientId);
    }

    public Optional<PatientReport> getReportById(Long id) {
        return patientReportRepository.findById(id);
    }

    @Transactional
    public boolean deleteReport(Long id) {
        if (patientReportRepository.existsById(id)) {
            // Optional: If you want to delete the file from Cloudinary upon report deletion
            // you'd need the public_id from the reportUrl or store it separately.
            // This requires more sophisticated Cloudinary integration. For simplicity,
            // we'll just delete the database record here.

            patientReportRepository.deleteById(id);
            return true;
        }
        return false;
    }
}