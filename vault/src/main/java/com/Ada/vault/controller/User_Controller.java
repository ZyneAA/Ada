package com.Ada.vault.controller;

import com.Ada.vault.domain.users.User;
import com.Ada.vault.domain.settings.Profile;
import com.Ada.vault.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@RestController
public class User_Controller {

    @Autowired(required = true)
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

    @PostMapping(path = "/vault/update_user_profile")
    public CompletableFuture<ResponseEntity<Profile>> update_user_settings(@RequestBody Profile profile) {

        return user_service.update_user_settings(profile)
                .thenApply(updated_profile -> ResponseEntity.status(HttpStatus.OK).body(updated_profile));

    }

}
