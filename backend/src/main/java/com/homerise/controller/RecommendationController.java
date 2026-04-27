package com.homerise.controller;

import com.homerise.dto.RecommendationRequest;
import com.homerise.dto.StandardResponse;
import com.homerise.model.Recommendation;
import com.homerise.service.RecommendationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<StandardResponse<List<Recommendation>>> getRecommendations() {
        List<Recommendation> recommendations = recommendationService.getAllActiveRecommendations();
        return ResponseEntity.ok(new StandardResponse<>(true, "Recommendations fetched", recommendations));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<StandardResponse<Recommendation>> createRecommendation(@Valid @RequestBody RecommendationRequest request) {
        Recommendation recommendation = recommendationService.createRecommendation(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StandardResponse<>(true, "Recommendation created", recommendation));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<StandardResponse<Recommendation>> updateRecommendation(
            @PathVariable Long id,
            @Valid @RequestBody RecommendationRequest request
    ) {
        Recommendation recommendation = recommendationService.updateRecommendation(id, request);
        return ResponseEntity.ok(new StandardResponse<>(true, "Recommendation updated", recommendation));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<StandardResponse<Object>> deleteRecommendation(@PathVariable Long id) {
        recommendationService.deleteRecommendation(id);
        return ResponseEntity.ok(new StandardResponse<>(true, "Recommendation deleted", null));
    }
}
