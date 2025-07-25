package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Repository.PatientReportResopsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PatientReportService {

    @Autowired
    private PatientReportResopsitory repo;

    public PatientReport uploadReport(PatientReport report) {
        return repo.save(report);
    }

    public List<PatientReport> getReportsByPatientId(Long patientId) {
        return repo.findByPatientId(patientId);
    }

    public void deleteReport(Long id) {
        repo.deleteById(id);
    }

}
