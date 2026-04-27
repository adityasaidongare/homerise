package com.homerise.service;

import com.homerise.dto.RecommendationRequest;
import com.homerise.exception.ResourceNotFoundException;
import com.homerise.model.Recommendation;
import com.homerise.repository.RecommendationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService {
    @Autowired
    private RecommendationRepository recommendationRepository;

    public List<Recommendation> getAllActiveRecommendations() {
        return recommendationRepository.findByIsActiveTrue();
    }

    public Recommendation createRecommendation(RecommendationRequest request) {
        Recommendation recommendation = new Recommendation();
        applyChanges(recommendation, request);
        return recommendationRepository.save(recommendation);
    }

    public Recommendation updateRecommendation(Long id, RecommendationRequest request) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found for id: " + id));
        applyChanges(recommendation, request);
        return recommendationRepository.save(recommendation);
    }

    public void deleteRecommendation(Long id) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found for id: " + id));
        recommendationRepository.delete(recommendation);
    }

    private void applyChanges(Recommendation recommendation, RecommendationRequest request) {
        recommendation.setTitle(request.getTitle());
        recommendation.setCategory(Recommendation.Category.valueOf(request.getCategory().replace(" ", "_")));
        recommendation.setDescription(request.getDescription());
        recommendation.setEstimatedCost(request.getEstimatedCost());
        recommendation.setRoiPercentage(request.getRoiPercentage());
        recommendation.setDifficulty(Recommendation.Difficulty.valueOf(request.getDifficulty()));
        recommendation.setImageUrl(request.getImageUrl());
        recommendation.setIsActive(Boolean.TRUE.equals(request.getIsActive()));
    }
}
