package com.homerise.repository;

import com.homerise.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByCategory(Recommendation.Category category);
    List<Recommendation> findByIsActiveTrue();
}