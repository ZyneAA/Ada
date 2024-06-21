package com.Ada.vault.controller;

import com.Ada.vault.domain.User;
import com.Ada.vault.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vault/users")
public class User_Controller {

    @Autowired
    private User_Service user_service;

    @PostMapping()
    public ResponseEntity<User> add_user(@RequestBody User user) {

        User save_user = user_service.add_user(user);
        return new ResponseEntity<>(save_user, HttpStatus.CREATED);

    }

    @GetMapping()
    public String OK() {

        return "OK";

    }

}
