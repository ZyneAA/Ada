package com.Ada.vault.controller;

import com.Ada.vault.domain.overwatch.Code_Executions;
import com.Ada.vault.service.Overwatch_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
public class Overwatch_Controller {

    @Autowired(required = true)
    private Overwatch_Service overwatch_service;

    @GetMapping(path = "/vault/get_code_exe_by_date")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_code_exe_by_date(@RequestParam String date) {

        return  overwatch_service.get_exe_data_by_date(date)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @GetMapping(path = "/vault/get_exe_data_by_user_id")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_exe_data_by_user_id(@RequestParam String user_id) {

        return  overwatch_service.get_exe_data_by_user_id(user_id)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

}
