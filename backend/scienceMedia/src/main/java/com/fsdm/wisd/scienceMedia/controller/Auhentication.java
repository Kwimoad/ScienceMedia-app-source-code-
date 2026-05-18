package com.fsdm.wisd.scienceMedia.controller;

import com.fsdm.wisd.scienceMedia.dto.AuthResponse;
import com.fsdm.wisd.scienceMedia.service.AuthenticationService;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController()
@RequestMapping("/auth")
public class Auhentication {

    private AuthenticationService authenticationService;


    public Auhentication(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> getToken(@RequestParam String email, @RequestParam String password){
        System.out.println("Requête reçue pour : " + email); // Si ceci ne s'affiche pas, c'est Spring Security qui bloque.
        return authenticationService.login(email,password);
    }

}
