package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.PatientReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientReportResopsitory extends JpaRepository<PatientReport, Long> {
    List<PatientReport> findByPatientId(long patientId);
}
