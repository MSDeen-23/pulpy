package com.pulpy.authserver.service;

import com.pulpy.authserver.feign.UserFeignService;
import com.pulpy.sharedservices.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserFeignService userFeignService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userFeignService.getUserByUserName(username);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());
    }

    public User loadUser(String username) throws UsernameNotFoundException {
        User user = userFeignService.getUserByUserName(username);
        return user;
    }
}
