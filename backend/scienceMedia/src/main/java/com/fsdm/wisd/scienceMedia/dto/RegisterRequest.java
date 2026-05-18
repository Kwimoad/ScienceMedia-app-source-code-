package com.fsdm.wisd.scienceMedia.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String bio;
    private String title;
    private String profileImage;
}
