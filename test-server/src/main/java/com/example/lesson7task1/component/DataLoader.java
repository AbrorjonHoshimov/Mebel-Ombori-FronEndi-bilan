package com.example.lesson7task1.component;

import com.example.lesson7task1.entity.Permission;
import com.example.lesson7task1.entity.Role;
import com.example.lesson7task1.entity.User;
import com.example.lesson7task1.repository.RoleRepository;
import com.example.lesson7task1.repository.UserRepository;
import com.example.lesson7task1.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.example.lesson7task1.entity.Permission.*;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Value("${spring.sql.init.mode}")
    String initMode;

    @Override
    public void run(String... args) throws Exception {


        if (initMode.equals("always")) {
            Permission[] values = Permission.values();
            Role admin = roleRepository.save(new Role(
                    Constants.ADMIN,
                    "Hamma narsa qoshish huquqiga ega",
                    Arrays.asList(values)
            ));
            Role director = roleRepository.save(new Role(
                    Constants.DIRECTOR,
                    "Mijoz",
                    Arrays.asList(ADD_COMMENT, DELETE_MYCOMMENT, EDIT_COMMENT)
            ));
            Role cordinator = roleRepository.save(new Role(
                    Constants.COORDINATOR,
                    "Mijoz",
                    Arrays.asList(ADD_COMMENT, DELETE_MYCOMMENT, EDIT_COMMENT)
            ));
            userRepository.save(new User(
                    "Abror",
                    "Hoshimov",
                    "+998970003066",
                    "Abrorjon",
                    passwordEncoder.encode("Aba777"),
                    admin,
                    true
            ));
        }
    }
}
