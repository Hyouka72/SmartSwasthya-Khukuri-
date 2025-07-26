package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.DepartmentRepository;
import com.backend.SmartSwasthya.Repository.DoctorRepository;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, HospitalRepository hospitalRepository, DepartmentRepository departmentRepository) {
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
        this.departmentRepository = departmentRepository;
    }

    @Transactional
    public Doctor createDoctor(Doctor doctor) {
        if (doctor.getHospital() == null || doctor.getHospital().getId() == null) {
            throw new IllegalArgumentException("Hospital information is required for a doctor.");
        }
        Hospital hospital = hospitalRepository.findById(doctor.getHospital().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + doctor.getHospital().getId() + " not found."));
        doctor.setHospital(hospital);

        if (doctor.getDepartment() == null || doctor.getDepartment().getId() == null) {
            throw new IllegalArgumentException("Department information is required for a doctor.");
        }
        Department department = departmentRepository.findById(doctor.getDepartment().getId())
                .orElseThrow(() -> new IllegalArgumentException("Department with ID " + doctor.getDepartment().getId() + " not found."));
        doctor.setDepartment(department);

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public List<Doctor> getDoctorsByHospitalId(Long hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId);
    }

    public List<Doctor> getDoctorsByDepartmentId(Long departmentId) {
        return doctorRepository.findByDepartmentId(departmentId);
    }

    @Transactional
    public Optional<Doctor> updateDoctor(Long id, Doctor updatedDoctor) {
        return doctorRepository.findById(id).map(existingDoctor -> {
            existingDoctor.setName(updatedDoctor.getName());
            existingDoctor.setContact(updatedDoctor.getContact());

            if (updatedDoctor.getHospital() != null && updatedDoctor.getHospital().getId() != null) {
                Hospital hospital = hospitalRepository.findById(updatedDoctor.getHospital().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Hospital with ID " + updatedDoctor.getHospital().getId() + " not found for doctor update."));
                existingDoctor.setHospital(hospital);
            }

            if (updatedDoctor.getDepartment() != null && updatedDoctor.getDepartment().getId() != null) {
                Department department = departmentRepository.findById(updatedDoctor.getDepartment().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Department with ID " + updatedDoctor.getDepartment().getId() + " not found for doctor update."));
                existingDoctor.setDepartment(department);
            }

            return doctorRepository.save(existingDoctor);
        });
    }

    @Transactional
    public boolean deleteDoctor(Long id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

