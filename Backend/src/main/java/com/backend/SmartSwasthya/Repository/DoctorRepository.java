package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByHospitalId(Long hospitalId);
    List<Doctor> findByDepartmentId(Long departmentId);
}