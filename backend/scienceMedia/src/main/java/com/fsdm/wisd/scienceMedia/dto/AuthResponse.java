package com.fsdm.wisd.scienceMedia.dto;

import com.fsdm.wisd.scienceMedia.entite.Userr;
import lombok.Data;

@Data
public class AuthResponse {
    private String acces_token;
    private Userr user;
}
