package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Role;
import com.example.lesson7task1.entity.User;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.RegisterDto;
import com.example.lesson7task1.payload.UserDto;
import com.example.lesson7task1.repository.RoleRepository;
import com.example.lesson7task1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    public ApiResponse addUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        user.setPhone(userDto.getPhone());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        Optional<Role> optionalRole = roleRepository.findById(userDto.getRoleId());
        Role role = optionalRole.get();
        if (!optionalRole.isPresent()) {
            return new ApiResponse("Not found", false);
        }
        user.setEnabled(true);
        user.setRole(role);
        userRepository.save(user);
        return new ApiResponse("Saved", true);
    }

    public ApiResponse editUser(UserDto userDto, long id) {
        Optional<User> byId = userRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        User user = byId.get();
        user.setFirstName(userDto.getFirstname());
        user.setLastName(userDto.getLastname());
        user.setPhone(userDto.getPhone());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        Optional<Role> optionalRole = roleRepository.findById(userDto.getRoleId());
        Role role = optionalRole.get();
        if (!optionalRole.isPresent()) {
            return new ApiResponse("Not found", false);
        }
        user.setRole(role);
        user.setEnabled(true);
        userRepository.save(user);
        return new ApiResponse("Edited", true);
    }

    public ApiResponse deleteUser(long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) return new ApiResponse("Not found", false);
        userRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }

    public ApiResponse getOne(long id) {
        Optional<User> byId = userRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        User user = byId.get();
        return new ApiResponse("OK", true, user);
    }

    public List<User> getall() {
        List<User> all = userRepository.findAll();
        return all;
    }
}
