-- HomeRise MySQL Schema
DROP TABLE IF EXISTS `user_recommendation`;
DROP TABLE IF EXISTS `property`;
DROP TABLE IF EXISTS `recommendation`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
);

CREATE TABLE `property` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    built_area DECIMAL(10,2) NOT NULL,
    budget DECIMAL(12,2) NOT NULL,
    current_condition VARCHAR(255) NOT NULL,
    goals VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_property_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,
    INDEX idx_property_user_id (user_id),
    INDEX idx_property_city (city),
    INDEX idx_property_pincode (pincode)
);

CREATE TABLE `recommendation` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    category ENUM('Painting', 'Flooring', 'Kitchen', 'Bathroom', 'Lighting', 'Garden', 'Security', 'Smart_Home', 'Vastu') NOT NULL,
    description TEXT NOT NULL,
    estimated_cost DECIMAL(12,2) NOT NULL,
    roi_percentage DECIMAL(5,2) NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_recommendation_category (category),
    INDEX idx_recommendation_active (is_active)
);

CREATE TABLE `user_recommendation` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    recommendation_id BIGINT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'PENDING',
    CONSTRAINT fk_user_recommendation_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_recommendation_property FOREIGN KEY (property_id) REFERENCES `property`(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_recommendation_recommendation FOREIGN KEY (recommendation_id) REFERENCES `recommendation`(id) ON DELETE CASCADE,
    INDEX idx_user_recommendation_user_id (user_id),
    INDEX idx_user_recommendation_property_id (property_id),
    INDEX idx_user_recommendation_recommendation_id (recommendation_id)
);

INSERT INTO `recommendation` (title, category, description, estimated_cost, roi_percentage, difficulty, image_url, is_active) VALUES
('Fresh Wall Paint', 'Painting', 'Repaint all rooms with neutral colors for a modern look.', 15000, 12.50, 'Easy', 'https://img.homerise.com/paint.jpg', TRUE),
('Laminate Flooring', 'Flooring', 'Upgrade to laminate flooring for durability and style.', 35000, 15.00, 'Medium', 'https://img.homerise.com/flooring.jpg', TRUE),
('Modular Kitchen', 'Kitchen', 'Install a modular kitchen for better space utilization.', 80000, 18.00, 'Hard', 'https://img.homerise.com/kitchen.jpg', TRUE),
('Bathroom Makeover', 'Bathroom', 'Renovate bathroom with new tiles and fixtures.', 40000, 14.00, 'Medium', 'https://img.homerise.com/bathroom.jpg', TRUE),
('LED Lighting Upgrade', 'Lighting', 'Switch to layered LED lighting for energy efficiency and better ambience.', 10000, 10.00, 'Easy', 'https://img.homerise.com/lighting.jpg', TRUE),
('Garden Landscaping', 'Garden', 'Add landscaping and plants to enhance curb appeal.', 25000, 13.00, 'Medium', 'https://img.homerise.com/garden.jpg', TRUE),
('CCTV Security Setup', 'Security', 'Install CCTV cameras for enhanced home security and buyer confidence.', 20000, 11.00, 'Easy', 'https://img.homerise.com/security.jpg', TRUE),
('Smart Home Starter Pack', 'Smart_Home', 'Add smart switches and basic automation for convenience and modern appeal.', 30000, 16.00, 'Medium', 'https://img.homerise.com/smarthome.jpg', TRUE),
('Vastu Entry Improvements', 'Vastu', 'Make small entry and circulation changes for better Vastu alignment.', 12000, 9.00, 'Easy', 'https://img.homerise.com/vastu.jpg', TRUE),
('Balcony Refresh', 'Garden', 'Upgrade your balcony with seating, planters, and lighting.', 18000, 12.00, 'Easy', 'https://img.homerise.com/balcony.jpg', TRUE);
