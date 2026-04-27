package com.homerise.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RecommendationRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Category is required")
    @Pattern(
            regexp = "^(Painting|Flooring|Kitchen|Bathroom|Lighting|Garden|Security|Smart Home|Vastu)$",
            message = "Category must be one of the supported HomeRise categories"
    )
    private String category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Estimated cost is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Estimated cost must be greater than 0")
    private Double estimatedCost;

    @NotNull(message = "ROI percentage is required")
    @DecimalMin(value = "0.0", message = "ROI percentage cannot be negative")
    @DecimalMax(value = "100.0", message = "ROI percentage cannot exceed 100")
    private Double roiPercentage;

    @NotBlank(message = "Difficulty is required")
    @Pattern(regexp = "^(Easy|Medium|Hard)$", message = "Difficulty must be Easy, Medium, or Hard")
    private String difficulty;

    private String imageUrl;

    private Boolean isActive = true;
}
