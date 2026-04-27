package com.homerise.controller;

import com.homerise.dto.PropertyRequest;
import com.homerise.dto.StandardResponse;
import com.homerise.model.Property;
import com.homerise.model.User;
import com.homerise.service.PropertyService;
import com.homerise.service.UserService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<StandardResponse<List<Property>>> getProperties(Authentication authentication) {
        User user = userService.getRequiredByEmail(authentication.getName());
        List<Property> properties = user.getRole() == User.Role.ADMIN
                ? propertyService.getAllProperties()
                : propertyService.getPropertiesByUser(user);
        return ResponseEntity.ok(new StandardResponse<>(true, "Properties fetched", properties));
    }

    @PostMapping
    public ResponseEntity<StandardResponse<Property>> createProperty(
            @Valid @RequestBody PropertyRequest request,
            Authentication authentication
    ) {
        User user = userService.getRequiredByEmail(authentication.getName());
        Property property = propertyService.createProperty(request, user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StandardResponse<>(true, "Property created", property));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StandardResponse<Property>> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequest request,
            Authentication authentication
    ) {
        User user = userService.getRequiredByEmail(authentication.getName());
        Property property = propertyService.updateProperty(id, request, user);
        return ResponseEntity.ok(new StandardResponse<>(true, "Property updated", property));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse<Object>> deleteProperty(@PathVariable Long id, Authentication authentication) {
        User user = userService.getRequiredByEmail(authentication.getName());
        propertyService.deleteProperty(id, user);
        return ResponseEntity.ok(new StandardResponse<>(true, "Property deleted", null));
    }
}
