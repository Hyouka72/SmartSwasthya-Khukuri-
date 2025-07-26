package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Appointment;
import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Repository.AppointmentRepository;
import com.backend.SmartSwasthya.Repository.DepartmentRepository;
import com.backend.SmartSwasthya.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DepartmentRepository departmentRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public AppointmentService(
            AppointmentRepository appointmentRepository,
            DepartmentRepository departmentRepository,
            PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.departmentRepository = departmentRepository;
        this.patientRepository = patientRepository;
    }

    @Transactional
    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getPatient() == null || appointment.getPatient().getId() == null) {
            throw new IllegalArgumentException("Patient information is required for an appointment.");
        }
        Patient patient = patientRepository.findById(appointment.getPatient().getId())
                .orElseThrow(() -> new IllegalArgumentException("Patient with ID " + appointment.getPatient().getId() + " not found."));
        appointment.setPatient(patient);

        if (appointment.getDepartment() == null || appointment.getDepartment().getId() == null) {
            throw new IllegalArgumentException("Department information is required for an appointment.");
        }
        Department department = departmentRepository.findById(appointment.getDepartment().getId())
                .orElseThrow(() -> new IllegalArgumentException("Department with ID " + appointment.getDepartment().getId() + " not found."));
        appointment.setDepartment(department);

        // If you had a 'status' field as a String, you could handle default here
        // if (appointment.getStatus() == null || appointment.getStatus().isEmpty()) {
        //     appointment.setStatus("SCHEDULED");
        // }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> findAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Transactional
    public Optional<Appointment> updateAppointment(Long id, Appointment updatedAppointment) {
        return appointmentRepository.findById(id).map(existingAppointment -> {
            existingAppointment.setAppointmentTime(updatedAppointment.getAppointmentTime());
            existingAppointment.setReason(updatedAppointment.getReason());

            // If a new Patient is provided, fetch and set the managed entity
            if (updatedAppointment.getPatient() != null && updatedAppointment.getPatient().getId() != null) {
                Patient patient = patientRepository.findById(updatedAppointment.getPatient().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Patient with ID " + updatedAppointment.getPatient().getId() + " not found for update."));
                existingAppointment.setPatient(patient);
            }

            // If a new Department is provided, fetch and set the managed entity
            if (updatedAppointment.getDepartment() != null && updatedAppointment.getDepartment().getId() != null) {
                Department department = departmentRepository.findById(updatedAppointment.getDepartment().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Department with ID " + updatedAppointment.getDepartment().getId() + " not found for update."));
                existingAppointment.setDepartment(department);
            }

            // If you had a 'status' field as a String, update it here
            // existingAppointment.setStatus(updatedAppointment.getStatus());

            return appointmentRepository.save(existingAppointment);
        });
    }

    @Transactional
    public boolean deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Appointment> findAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> findAppointmentsByDepartmentId(Long departmentId) {
        return appointmentRepository.findByDepartmentId(departmentId);
    }

    public List<Appointment> findAppointmentsByDepartmentIdAndAppointmentTimeBetween(Long departmentId, LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.findByDepartmentIdAndAppointmentTimeBetween(departmentId, start, end);
    }
}
