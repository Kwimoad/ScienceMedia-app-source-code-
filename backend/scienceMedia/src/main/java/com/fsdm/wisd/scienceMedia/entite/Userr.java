package com.fsdm.wisd.scienceMedia.entite;

import com.fsdm.wisd.scienceMedia.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Userr {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String username;

    @Column(unique = true)
    private String email;
    private String password;
    private String bio;
    private String title;
    private String profileImage;

    private Role role;
}
