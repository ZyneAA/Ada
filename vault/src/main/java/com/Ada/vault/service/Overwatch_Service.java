package com.Ada.vault.service;

import com.Ada.vault.domain.overwatch.Code_Executions;
import com.Ada.vault.repository.overwatch.code_executions.Code_Executions_Repository_JDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class Overwatch_Service {

    @Autowired
    private Code_Executions_Repository_JDBC code_executions_repository_jdbc;

    @Async
    public CompletableFuture<List<Code_Executions>>get_exe_data_by_date(String date) {

        List<Code_Executions>exe_list = code_executions_repository_jdbc.get_exe_data_by_date(date);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<List<Code_Executions>>get_exe_data_by_user_id(String user_id) {

        List<Code_Executions>exe_list = code_executions_repository_jdbc.get_exe_data_by_user_id(user_id);

        return CompletableFuture.completedFuture(exe_list);

    }

}
