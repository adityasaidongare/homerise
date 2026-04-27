package com.homerise.dto;

import com.homerise.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private User.Role role;

    public static UserSummary from(User user) {
        return new UserSummary(user.getId(), user.getName(), user.getEmail(), user.getPhone(), user.getRole());
    }
}
