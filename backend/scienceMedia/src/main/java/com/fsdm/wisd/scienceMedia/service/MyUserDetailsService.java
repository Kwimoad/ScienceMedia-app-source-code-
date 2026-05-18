package com.fsdm.wisd.scienceMedia.service;


import com.fsdm.wisd.scienceMedia.entite.MyUserDetail;
import com.fsdm.wisd.scienceMedia.entite.Userr;
import com.fsdm.wisd.scienceMedia.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class MyUserDetailsService implements UserDetailsService {

    private UserRepository UR;

    public MyUserDetailsService(UserRepository UR) {
        this.UR = UR;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Userr> user=UR.findByEmail(email);
        if(user.isPresent()){
            return new MyUserDetail(
                    user.get().getEmail(),
                    user.get().getPassword(),
                    user.get().getRole()
            );
        }
        else{
            throw  new UsernameNotFoundException("l'utilisateur n'est pas exist");
        }
    }
}