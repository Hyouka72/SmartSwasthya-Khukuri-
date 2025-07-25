package com.backend.SmartSwasthya.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PatientReport {
    @Id
    @GeneratedValue
    private Long id;

    private long patientId;

    private String reportType;
    private String reportUrl;
    private String uploadedBy;
    private String uploadedDate;
}
