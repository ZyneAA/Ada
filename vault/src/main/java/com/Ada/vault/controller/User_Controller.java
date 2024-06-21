package com.Ada.vault.controller;

import com.Ada.vault.domain.User;
import com.Ada.vault.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
public class User_Controller {

    @Autowired
    private User_Service user_service;

    @PostMapping(path = "/vault/add_user")
    public CompletableFuture<ResponseEntity<User>>add_user(@RequestBody User user) {

        return user_service.add_user(user)
                .thenApply(saved_user -> ResponseEntity.status(HttpStatus.CREATED).body(saved_user));

    }

    @PostMapping(path = "/vault/find_user_by_username")
    public CompletableFuture<ResponseEntity<String>> find_user_by_username(@RequestBody User user) {

        return user_service.find_user_by_username(user.get_username())
                .thenApply(get_user -> ResponseEntity.status(HttpStatus.FOUND).body(get_user));

    }

}
