package com.fsdm.wisd.scienceMedia.service;

import com.fsdm.wisd.scienceMedia.dto.AuthResponse;
import com.fsdm.wisd.scienceMedia.entite.Userr;
import com.fsdm.wisd.scienceMedia.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {

    private final JwtEncoder jwtEncoder;
    private JwtDecoder jwtDecoder;
    private final AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    @Value("${jwt.timeExpairation}")
    private int timeExpairation;

    public AuthenticationService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder, AuthenticationManager authenticationManager,UserRepository userRepository) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.authenticationManager = authenticationManager;
        this.userRepository=userRepository;
    }

    public ResponseEntity<AuthResponse> login(String username, String password) {
        System.out.println("------------- service authentication ------------");
        Authentication authentication=null;
        String subject=null;
        String scope=null;
        AuthResponse response = new AuthResponse();
        authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        subject=authentication.getName();
        scope=authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
        Instant instant=Instant.now();
        Userr user=userRepository.findByEmail(subject).get();
        System.out.println("------------------");
        System.out.println(user);
        System.out.println("-------------------");
        JwtClaimsSet jwtClaimSet= JwtClaimsSet.builder()
                .subject(subject)
                .issuedAt(instant)
                .expiresAt(instant.plus(timeExpairation, ChronoUnit.MINUTES))
                .claim("scope",scope)
                .build();

        JwtEncoderParameters jwtEncoderParameters=JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS512).build(),
                jwtClaimSet
        );

        Jwt jwt=jwtEncoder.encode(jwtEncoderParameters);
        String jwtString=jwt.getTokenValue();

        response.setAcces_token(jwtString);
        response.setUser(user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
