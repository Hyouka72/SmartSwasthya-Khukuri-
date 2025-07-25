package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.Paitent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaitentRepository extends JpaRepository<Paitent, Long> {
}
