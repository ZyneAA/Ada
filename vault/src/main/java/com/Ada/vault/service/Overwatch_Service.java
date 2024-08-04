package com.Ada.vault.service;

import com.Ada.vault.domain.overwatch.Code_Executions;
import com.Ada.vault.domain.overwatch.Visitations;
import com.Ada.vault.repository.overwatch.code_executions.Code_Executions_Repository_JDBC;
import com.Ada.vault.repository.overwatch.visitations.Visitations_Repository_JDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class Overwatch_Service {

    @Autowired
    private Code_Executions_Repository_JDBC code_executions_repository_jdbc;

    @Autowired
    private Visitations_Repository_JDBC visitations_repository_jdbc;

    @Async
    public CompletableFuture<List<Code_Executions>>get_exe_data_by_date(String date) {

        List<Code_Executions> exe_list = code_executions_repository_jdbc.get_exe_data_by_date(date);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<List<Code_Executions>> get_exe_data_by_user_id(String user_id) {

        List<Code_Executions> exe_list = code_executions_repository_jdbc.get_exe_data_by_user_id(user_id);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<List<Code_Executions>> get_exe_data_by_version(String version) {

        List<Code_Executions> exe_list = code_executions_repository_jdbc.get_exe_data_by_version(version);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<List<Code_Executions>> get_exe_data_by_language(String language) {

        List<Code_Executions> exe_list = code_executions_repository_jdbc.get_exe_data_by_language(language);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<Code_Executions> record_execute(Code_Executions code_executions) {

        code_executions_repository_jdbc.record_execute(code_executions);

        return CompletableFuture.completedFuture(code_executions);

    }

    @Async
    public CompletableFuture<List<Code_Executions>> get_exe_data_by_date_range(String date_0, String date_1) {

        List<Code_Executions> exe_list = code_executions_repository_jdbc.get_exe_data_by_date_range(date_0, date_1);

        return CompletableFuture.completedFuture(exe_list);

    }

    @Async
    public CompletableFuture<List<Visitations>> get_visitations_by_user_id(Long user_id) {

        List<Visitations> visit_list = visitations_repository_jdbc.get_visitations_by_user_id(user_id);

        return CompletableFuture.completedFuture(visit_list);

    }

    @Async
    public CompletableFuture<List<Visitations>> get_visitations_by_last_visit(String last_visit) {

        List<Visitations> visit_list = visitations_repository_jdbc.get_visitations_by_last_visit(last_visit);

        return CompletableFuture.completedFuture(visit_list);

    }

    @Async
    public CompletableFuture<List<Visitations>> get_visitations_by_last_login(String last_login) {

        List<Visitations> visit_list = visitations_repository_jdbc.get_visitations_by_last_login(last_login);

        return CompletableFuture.completedFuture(visit_list);

    }

    @Async
    public CompletableFuture<List<Visitations>> get_visitations_by_last_visit_range(String last_visit_0, String last_visit_1) {

        List<Visitations> visit_list = visitations_repository_jdbc.get_visitations_by_last_visit_range(last_visit_0, last_visit_1);

        return CompletableFuture.completedFuture(visit_list);

    }

    @Async
    public CompletableFuture<List<Visitations>> get_visitations_by_last_login_range(String last_login_0, String last_login_1) {

        List<Visitations> visit_list = visitations_repository_jdbc.get_visitations_by_last_login_range(last_login_0, last_login_0);

        return CompletableFuture.completedFuture(visit_list);

    }

    @Async
    public CompletableFuture<Visitations> insert_visitation(Visitations visitations) {

        visitations_repository_jdbc.insert_visitation(visitations);

        return CompletableFuture.completedFuture(visitations);

    }

    @Async
    public CompletableFuture<Visitations> update_visitation(Visitations visitations) {

        visitations_repository_jdbc.update_visitation(visitations);

        return CompletableFuture.completedFuture(visitations);

    }

}
