package com.fsdm.wisd.scienceMedia.controller.auth;

import com.fsdm.wisd.scienceMedia.dto.AuthResponse;
import com.fsdm.wisd.scienceMedia.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
