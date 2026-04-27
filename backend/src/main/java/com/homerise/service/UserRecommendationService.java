package com.homerise.service;

import com.homerise.exception.ResourceNotFoundException;
import com.homerise.exception.UnauthorizedException;
import com.homerise.model.Property;
import com.homerise.model.Recommendation;
import com.homerise.model.User;
import com.homerise.model.UserRecommendation;
import com.homerise.repository.RecommendationRepository;
import com.homerise.repository.UserRecommendationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRecommendationService {
    @Autowired
    private UserRecommendationRepository userRecommendationRepository;

    @Autowired
    private RecommendationRepository recommendationRepository;

    public List<UserRecommendation> getByUser(User user) {
        return userRecommendationRepository.findByUser(user);
    }

    public UserRecommendation createUserRecommendation(User user, Property property, Long recommendationId) {
        if (!property.getUser().getId().equals(user.getId()) && user.getRole() != User.Role.ADMIN) {
            throw new UnauthorizedException("You can only link recommendations to your own property");
        }

        Recommendation recommendation = recommendationRepository.findById(recommendationId)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found for id: " + recommendationId));

        UserRecommendation userRecommendation = new UserRecommendation();
        userRecommendation.setUser(user);
        userRecommendation.setProperty(property);
        userRecommendation.setRecommendation(recommendation);
        userRecommendation.setStatus(UserRecommendation.Status.PENDING);
        return userRecommendationRepository.save(userRecommendation);
    }
}
