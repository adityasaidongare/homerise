package com.homerise.repository;

import com.homerise.model.Property;
import com.homerise.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByUser(User user);
}