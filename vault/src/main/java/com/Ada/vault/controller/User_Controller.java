package com.Ada.vault.controller;

import com.Ada.vault.domain.User;
import com.Ada.vault.domain.User_Settings;
import com.Ada.vault.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@RestController
public class User_Controller {

    @Autowired
    private User_Service user_service;

    @PostMapping(path = "/vault/add_user")
    public CompletableFuture<ResponseEntity<User>> add_user(@RequestBody User user) {

        return user_service.add_user(user)
                .thenApply(saved_user -> ResponseEntity.status(HttpStatus.CREATED).body(saved_user));

    }

    @GetMapping(path = "/vault/find_user_by_username")
    public CompletableFuture<ResponseEntity<User>> find_user_by_username(@RequestParam String username) {

        return user_service.find_user_by_username(username)
                .thenApply(user -> ResponseEntity.status(HttpStatus.OK).body(Objects.requireNonNullElseGet(user, User::new)));

    }

    @GetMapping(path = "/vault/find_user_by_id")
    public CompletableFuture<ResponseEntity<User>> find_user_by_id(@RequestParam Long id) {

        return user_service.find_user_by_id(id)
                .thenApply(user -> ResponseEntity.status(HttpStatus.OK).body(Objects.requireNonNullElseGet(user, User::new)));

    }

    @PostMapping(path = "/vault/update_user_settings")
    public CompletableFuture<ResponseEntity<User_Settings>> update_user_settings(@RequestBody User_Settings user_settings) {

        return user_service.update_user_settings(user_settings)
                .thenApply(updated_user_settings -> ResponseEntity.status(HttpStatus.OK).body(updated_user_settings))
                .exceptionally(_ -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new User_Settings()));

    }

}
