package com.homerise.service;

import com.homerise.dto.PropertyRequest;
import com.homerise.exception.ResourceNotFoundException;
import com.homerise.exception.UnauthorizedException;
import com.homerise.model.Property;
import com.homerise.model.User;
import com.homerise.repository.PropertyRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByUser(User user) {
        return propertyRepository.findByUser(user);
    }

    public Property createProperty(PropertyRequest request, User user) {
        Property property = new Property();
        property.setUser(user);
        applyChanges(property, request);
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, PropertyRequest request, User user) {
        Property property = getPropertyById(id);
        verifyOwnership(property, user);
        applyChanges(property, request);
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id, User user) {
        Property property = getPropertyById(id);
        verifyOwnership(property, user);
        propertyRepository.delete(property);
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found for id: " + id));
    }

    private void verifyOwnership(Property property, User user) {
        if (user.getRole() != User.Role.ADMIN && !property.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not allowed to modify this property");
        }
    }

    private void applyChanges(Property property, PropertyRequest request) {
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setPincode(request.getPincode());
        property.setPropertyType(request.getPropertyType());
        property.setBuiltArea(request.getBuiltArea());
        property.setBudget(request.getBudget());
        property.setCurrentCondition(request.getCurrentCondition());
        property.setGoals(request.getGoals());
    }
}
