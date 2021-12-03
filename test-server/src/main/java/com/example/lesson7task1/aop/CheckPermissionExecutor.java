package com.example.lesson7task1.aop;

import com.example.lesson7task1.entity.User;
import com.example.lesson7task1.exeptions.ForbiddenExeption;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class CheckPermissionExecutor {
    @Before(value = ("@annotation(huquqniTekshirish)"))
    public void chechPermissionMyMethod(CheckPermission huquqniTekshirish) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean exist = false;
        for (GrantedAuthority authority : user.getAuthorities()) {
            if (authority.getAuthority().equals(huquqniTekshirish.huquq())) {
                exist = true;
                break;
            }
        }
        if (!exist)
            throw new ForbiddenExeption(huquqniTekshirish.huquq(), "Sizga huquq yoq");


    }

}
