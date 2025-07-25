package com.backend.SmartSwasthya.Models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Paitent {
    @Id @GeneratedValue
    private Long id;

    private String name;
    private String phone;
    private String gender;
    private String age;


    @ManyToOne
    private Hospital hospital;

    private String medicalReportUrl;
}
