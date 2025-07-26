package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDepartmentId(Long departmentId);
    // You might add more specific queries, e.g., by date range, or by patient and department
    List<Appointment> findByDepartmentIdAndAppointmentTimeBetween(Long departmentId, LocalDateTime start, LocalDateTime end);
}