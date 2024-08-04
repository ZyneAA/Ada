package com.Ada.vault.controller;

import com.Ada.vault.domain.overwatch.Code_Executions;
import com.Ada.vault.domain.overwatch.Visitations;
import com.Ada.vault.service.Overwatch_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(path = "/vault/get_exe_data_by_date_range")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_exe_data_by_date_range(@RequestParam String date_0, @RequestParam String date_1) {

        return  overwatch_service.get_exe_data_by_date_range(date_0, date_1)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @GetMapping(path = "/vault/get_exe_data_by_user_id")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_exe_data_by_user_id(@RequestParam String user_id) {

        return  overwatch_service.get_exe_data_by_user_id(user_id)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @GetMapping(path = "/vault/get_exe_data_by_language")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_exe_data_by_language(@RequestParam String language) {

        return  overwatch_service.get_exe_data_by_language(language)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @GetMapping(path = "/vault/get_exe_data_by_version")
    public CompletableFuture<ResponseEntity<List<Code_Executions>>> get_exe_data_by_version(@RequestParam String version) {

        return  overwatch_service.get_exe_data_by_version(version)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @PostMapping(path = "/vault/record_execute")
    public CompletableFuture<ResponseEntity<Code_Executions>> record_execute(@RequestBody Code_Executions code_executions) {

        return  overwatch_service.record_execute(code_executions)
                .thenApply(code_exe -> ResponseEntity.status(HttpStatus.OK).body(code_exe));

    }

    @GetMapping(path = "/vault/get_visitations_by_user_id")
    public CompletableFuture<ResponseEntity<List<Visitations>>> get_visitations_by_user_id(@RequestParam Long user_id) {

        return  overwatch_service.get_visitations_by_user_id(user_id)
                .thenApply(visit -> ResponseEntity.status(HttpStatus.OK).body(visit));

    }

    @GetMapping(path = "/vault/get_visitations_by_last_visit")
    public CompletableFuture<ResponseEntity<List<Visitations>>> get_visitations_by_last_visit(@RequestParam String last_visit) {

        return  overwatch_service.get_visitations_by_last_visit(last_visit)
                .thenApply(visit -> ResponseEntity.status(HttpStatus.OK).body(visit));

    }

    @GetMapping(path = "/vault/get_visitations_by_last_visit_range")
    public CompletableFuture<ResponseEntity<List<Visitations>>> get_visitations_by_last_visit_range(@RequestParam String last_visit_0, @RequestParam String last_visit_1) {

        return  overwatch_service.get_visitations_by_last_visit_range(last_visit_0, last_visit_1)
                .thenApply(visit -> ResponseEntity.status(HttpStatus.OK).body(visit));

    }

    @GetMapping(path = "/vault/get_visitations_by_last_login")
    public CompletableFuture<ResponseEntity<List<Visitations>>> get_visitations_by_last_login(@RequestParam String last_login) {

        return  overwatch_service.get_visitations_by_last_login(last_login)
                .thenApply(visit -> ResponseEntity.status(HttpStatus.OK).body(visit));

    }

    @GetMapping(path = "/vault/get_visitations_by_last_login_range")
    public CompletableFuture<ResponseEntity<List<Visitations>>> get_visitations_by_last_login_range(@RequestParam String last_login_0, @RequestParam String last_login_1) {

        return  overwatch_service.get_visitations_by_last_login_range(last_login_0, last_login_1)
                .thenApply(visit -> ResponseEntity.status(HttpStatus.OK).body(visit));

    }

}
