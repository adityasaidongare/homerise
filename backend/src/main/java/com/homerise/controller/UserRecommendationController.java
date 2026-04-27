package com.homerise.controller;

import com.homerise.dto.StandardResponse;
import com.homerise.model.Property;
import com.homerise.model.User;
import com.homerise.model.UserRecommendation;
import com.homerise.service.PropertyService;
import com.homerise.service.UserRecommendationService;
import com.homerise.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-recommendations")
public class UserRecommendationController {
    @Autowired
    private UserRecommendationService userRecommendationService;

    @Autowired
    private UserService userService;

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public ResponseEntity<StandardResponse<List<UserRecommendation>>> getUserRecommendations(Authentication authentication) {
        User user = userService.getRequiredByEmail(authentication.getName());
        List<UserRecommendation> recommendations = userRecommendationService.getByUser(user);
        return ResponseEntity.ok(new StandardResponse<>(true, "User recommendations fetched", recommendations));
    }

    @PostMapping
    public ResponseEntity<StandardResponse<UserRecommendation>> createUserRecommendation(
            @RequestParam Long propertyId,
            @RequestParam Long recommendationId,
            Authentication authentication
    ) {
        User user = userService.getRequiredByEmail(authentication.getName());
        Property property = propertyService.getPropertyById(propertyId);
        UserRecommendation recommendation = userRecommendationService.createUserRecommendation(user, property, recommendationId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StandardResponse<>(true, "User recommendation created", recommendation));
    }
}
