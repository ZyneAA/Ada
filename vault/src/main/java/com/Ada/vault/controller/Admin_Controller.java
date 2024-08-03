package com.Ada.vault.controller;

import com.Ada.vault.domain.admins.Admin;
import com.Ada.vault.service.Admin_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
public class Admin_Controller {

    @Autowired(required = true)
    private Admin_Service admin_service;

    @GetMapping(path = "/vault/get_admin_by_admin_name")
    public CompletableFuture<ResponseEntity<Admin>> get_admin_by_admin_name(@RequestParam String admin_name) {

        return admin_service.find_admin_by_admin_name(admin_name)
                .thenApply(admin -> ResponseEntity.status(HttpStatus.OK).body(admin));

    }

    @GetMapping(path = "/vault/get_admin_by_admin_id")
    public CompletableFuture<ResponseEntity<Admin>> get_admin_by_admin_id(@RequestParam Long admin_id) {

        return admin_service.find_admin_by_admin_id(admin_id)
                .thenApply(admin -> ResponseEntity.status(HttpStatus.OK).body(admin));

    }

}
