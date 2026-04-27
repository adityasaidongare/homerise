package com.homerise.repository;

import com.homerise.model.UserRecommendation;
import com.homerise.model.User;
import com.homerise.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRecommendationRepository extends JpaRepository<UserRecommendation, Long> {
    List<UserRecommendation> findByUser(User user);
    List<UserRecommendation> findByProperty(Property property);
}