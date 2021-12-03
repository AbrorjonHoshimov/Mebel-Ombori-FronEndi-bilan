package com.example.lesson7task1.config;

import com.example.lesson7task1.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.UUID;

@Configuration
@EnableJpaAuditing
public class KimYozganiniSozlash {
    @Bean
    AuditorAware<Long> auditorAware() {
        return new KimYozganiniBilish();
    }
}
