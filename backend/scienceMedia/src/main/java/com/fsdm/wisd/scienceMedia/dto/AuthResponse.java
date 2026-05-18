package com.fsdm.wisd.scienceMedia.dto;

import com.fsdm.wisd.scienceMedia.entite.Userr;

public class AuthResponse {
    private String acces_token;
    private Userr user;

    public String getAcces_token() {
        return acces_token;
    }

    public void setAcces_token(String acces_token) {
        this.acces_token = acces_token;
    }

    public Userr getUser() {
        return user;
    }

    public void setUser(Userr user) {
        this.user = user;
    }
}
