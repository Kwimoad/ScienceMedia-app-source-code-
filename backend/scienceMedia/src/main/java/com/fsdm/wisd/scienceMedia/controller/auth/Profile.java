package com.fsdm.wisd.scienceMedia.controller.auth;


import com.fsdm.wisd.scienceMedia.dto.AuthResponse;
import com.fsdm.wisd.scienceMedia.dto.RegisterRequest;
import com.fsdm.wisd.scienceMedia.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/profile")
public class Profile {
    private AuthenticationService authenticationService;


    public Profile(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PutMapping("/change-password")
    public HttpStatus resetPassword(Authentication authentication, @RequestParam String newPassword){
        return authenticationService.resetPassword(authentication , newPassword);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest profile){
        if (authenticationService.register(profile)){
            System.out.println(profile);
            return authenticationService.login(profile.getEmail() , profile.getPassword());
        }
        return null;
    }



}
