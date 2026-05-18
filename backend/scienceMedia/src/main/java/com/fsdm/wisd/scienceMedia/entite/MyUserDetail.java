package com.fsdm.wisd.scienceMedia.entite;



import com.fsdm.wisd.scienceMedia.enums.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@AllArgsConstructor
public class MyUserDetail implements UserDetails {

    private String username;
    private String password;
    private Role role;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role!=null)
            return List.of(new SimpleGrantedAuthority(this.role.toString()));
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
