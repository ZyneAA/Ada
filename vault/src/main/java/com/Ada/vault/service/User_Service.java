package com.Ada.vault.service;

import com.Ada.vault.domain.User;
import com.Ada.vault.repository.JDBC_User_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class User_Service {

    @Autowired
    private JDBC_User_Repository jdbc_user_repository;

    public User add_user(User user) {

        jdbc_user_repository.add(user);
        return user;

    }

    public User find_user_by_username(String username) {

        return jdbc_user_repository.find_user_by_username(username);

    }

}
