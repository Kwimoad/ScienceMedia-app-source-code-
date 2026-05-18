package com.fsdm.wisd.scienceMedia;

import com.fsdm.wisd.scienceMedia.entite.Userr;
import com.fsdm.wisd.scienceMedia.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ScienceMediaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScienceMediaApplication.class, args);
	}


	@Autowired
	private PasswordEncoder passwordEncoder;
	@Bean
	public CommandLineRunner initDatabase(UserRepository repository) {
		return args -> {
			// Votre logique d'initialisation ici
			System.out.println("--- Initialisation de la base H2 ---");
			Userr user = new Userr();
			user.setUsername("elouardi");
			user.setEmail("elouardi@gmail.com");
			user.setPassword(passwordEncoder.encode("abdo123"));
			user.setBio("hamdolilah");
			user.setTitle("data scientist");
			user.setProfileImage("images");
			repository.save(user);

			System.out.println("--- Données insérées avec succès ! ---");
		};
	}

}
