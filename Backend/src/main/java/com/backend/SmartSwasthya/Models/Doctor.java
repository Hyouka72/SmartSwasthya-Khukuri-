package com.backend.SmartSwasthya.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Doctor {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String speciality;
    private String contact;

    @ManyToOne
    private Hospital hospital;
}
