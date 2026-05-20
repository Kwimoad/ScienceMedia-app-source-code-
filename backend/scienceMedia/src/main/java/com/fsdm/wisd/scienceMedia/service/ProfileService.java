package com.fsdm.wisd.scienceMedia.service;

import com.fsdm.wisd.scienceMedia.entite.Image;
import com.fsdm.wisd.scienceMedia.entite.Userr;
import com.fsdm.wisd.scienceMedia.repositories.ImageRepository;
import com.fsdm.wisd.scienceMedia.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    public ProfileService(UserRepository userRepository , ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }

    public HttpStatus changeProfileImage(MultipartFile file, Authentication authentication){
        try{
            Image image = new Image();
            image.setImageData(file.getBytes());
            Userr user=userRepository.findByEmail(authentication.getName()).get();
            user.setProfileImage(image);
            imageRepository.save(image);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }


    }
}
