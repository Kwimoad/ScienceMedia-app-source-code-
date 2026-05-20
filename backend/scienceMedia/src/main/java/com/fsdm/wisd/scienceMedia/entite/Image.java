package com.fsdm.wisd.scienceMedia.entite;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Image")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Lob
    @Column(name = "image_data", length = 10000000) // Extension de la taille max pour MySQL/PostgreSQL
    private byte[] imageData;

    private String imageType;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relation bidirectionnelle : permet de retrouver le post depuis l'image si besoin
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id") // Clé étrangère dans la table post_images
    private Userr user;
}