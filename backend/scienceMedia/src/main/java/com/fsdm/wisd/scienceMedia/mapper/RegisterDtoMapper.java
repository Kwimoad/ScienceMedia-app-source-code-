package com.fsdm.wisd.scienceMedia.mapper;

import com.fsdm.wisd.scienceMedia.dto.RegisterRequest;
import com.fsdm.wisd.scienceMedia.entite.Userr;
import org.springframework.beans.BeanUtils;

public class RegisterDtoMapper {
    public static Userr fromRegisterRequestToUser(RegisterRequest profile){
        Userr user = new Userr();
        BeanUtils.copyProperties(profile, user);
        return user;
    }
}
