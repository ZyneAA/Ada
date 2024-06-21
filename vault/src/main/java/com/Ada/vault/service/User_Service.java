package com.Ada.vault.service;

import com.Ada.vault.domain.User;
import com.Ada.vault.repository.JDBC_User_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class User_Service {

    @Autowired
    private JDBC_User_Repository jdbc_user_repository;

    @Async
    public CompletableFuture<User>  add_user(User user) {

        jdbc_user_repository.add(user);
        return CompletableFuture.completedFuture(user);

    }

    @Async
    public CompletableFuture<String> find_user_by_username(String username) {

        User get_user = jdbc_user_repository.find_user_by_username(username);
        return CompletableFuture.completedFuture(get_user.get_username());

    }

}
