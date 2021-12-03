package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Role;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.RoleDto;
import com.example.lesson7task1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public ApiResponse addRole(RoleDto roleDto) {
        boolean byName = roleRepository.existsByName(roleDto.getName());
        if (byName) return new ApiResponse("Bunday nomli Role mavjud", false);
        Role role = new Role();
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        role.setPermissions(roleDto.getPermissionList());
        roleRepository.save(role);
        return new ApiResponse("saved", true);

    }

    public ApiResponse editRole(RoleDto roleDto, long id) {

        Optional<Role> byId = roleRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        Role role = byId.get();
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        role.setPermissions(roleDto.getPermissionList());
        roleRepository.save(role);
        return new ApiResponse("Edited", true);
    }

    public ApiResponse deleteRole(long id) {
        boolean exists = roleRepository.existsById(id);
        if (!exists) return new ApiResponse("Not found", false);
        roleRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }

    public ApiResponse getOne(Long id) {
        Optional<Role> byId = roleRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        return new ApiResponse("ok", true, byId.get());
    }

    public List<Role> getall() {
        List<Role> all = roleRepository.findAll();
        return all;
    }
}
