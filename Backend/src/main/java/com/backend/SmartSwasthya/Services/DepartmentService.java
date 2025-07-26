package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.DepartmentRepository;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final HospitalRepository hospitalRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository, HospitalRepository hospitalRepository) {
        this.departmentRepository = departmentRepository;
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Department createDepartment(Department department) {
        if (department.getHospital() == null || department.getHospital().getId() == null) {
            throw new IllegalArgumentException("Hospital information is required for a department.");
        }
        Hospital hospital = hospitalRepository.findById(department.getHospital().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + department.getHospital().getId() + " not found."));
        department.setHospital(hospital);
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    public List<Department> getDepartmentsByHospitalId(Long hospitalId) {
        return departmentRepository.findByHospitalId(hospitalId);
    }

    @Transactional
    public Optional<Department> updateDepartment(Long id, Department updatedDepartment) {
        return departmentRepository.findById(id).map(existingDepartment -> {
            existingDepartment.setName(updatedDepartment.getName());
            existingDepartment.setDescription(updatedDepartment.getDescription());

            if (updatedDepartment.getHospital() != null && updatedDepartment.getHospital().getId() != null) {
                Hospital hospital = hospitalRepository.findById(updatedDepartment.getHospital().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + updatedDepartment.getHospital().getId() + " not found for department update."));
                existingDepartment.setHospital(hospital);
            }
            return departmentRepository.save(existingDepartment);
        });
    }

    @Transactional
    public boolean deleteDepartment(Long id) {
        if (departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
