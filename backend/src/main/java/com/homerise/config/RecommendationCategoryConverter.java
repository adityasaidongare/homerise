package com.homerise.config;

import com.homerise.model.Recommendation;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class RecommendationCategoryConverter implements AttributeConverter<Recommendation.Category, String> {
    @Override
    public String convertToDatabaseColumn(Recommendation.Category category) {
        if (category == null) {
            return null;
        }
        return category == Recommendation.Category.Smart_Home ? "Smart Home" : category.name();
    }

    @Override
    public Recommendation.Category convertToEntityAttribute(String dbValue) {
        if (dbValue == null || dbValue.isBlank()) {
            return null;
        }
        return Recommendation.Category.valueOf(dbValue.replace(" ", "_"));
    }
}
