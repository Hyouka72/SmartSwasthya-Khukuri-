package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findByHospitalId(Long hospitalId);
}