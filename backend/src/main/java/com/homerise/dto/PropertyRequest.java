package com.homerise.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PropertyRequest {
    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^\\d{6}$", message = "Pincode must be exactly 6 digits")
    private String pincode;

    @NotBlank(message = "Property type is required")
    private String propertyType;

    @NotNull(message = "Built area is required")
    @DecimalMin(value = "1.0", message = "Built area must be greater than 0")
    private Double builtArea;

    @NotNull(message = "Budget is required")
    @DecimalMin(value = "10000.0", message = "Budget must be at least 10000")
    private Double budget;

    @NotBlank(message = "Current condition is required")
    private String currentCondition;

    @NotBlank(message = "Goals are required")
    private String goals;
}
