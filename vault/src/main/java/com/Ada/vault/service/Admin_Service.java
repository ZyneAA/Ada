package com.Ada.vault.service;

import com.Ada.vault.domain.admins.Admin;
import com.Ada.vault.repository.admins.Admins_Repository_JDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class Admin_Service {

    @Autowired
    private Admins_Repository_JDBC admins_repository_jdbc;

    @Async
    public CompletableFuture<Admin> find_admin_by_admin_name(String admin_name) {

        Admin admin = admins_repository_jdbc.find_admin_by_admin_name(admin_name);

        return CompletableFuture.completedFuture(admin);

    }

    @Async
    public CompletableFuture<Admin> find_admin_by_admin_id(Long id) {

        Admin admin = admins_repository_jdbc.find_admin_by_admin_id(id);

        return CompletableFuture.completedFuture(admin);

    }

}
