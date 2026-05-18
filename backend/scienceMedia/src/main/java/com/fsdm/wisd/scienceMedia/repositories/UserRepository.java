package com.fsdm.wisd.scienceMedia.repositories;

import com.fsdm.wisd.scienceMedia.entite.Userr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Userr,Long> {

    Optional<Userr> findByEmail(String username);
}
