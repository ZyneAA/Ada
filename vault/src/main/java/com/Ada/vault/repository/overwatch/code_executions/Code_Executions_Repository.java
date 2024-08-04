package com.Ada.vault.repository.overwatch.code_executions;

import com.Ada.vault.domain.overwatch.Code_Executions;

import java.util.List;

public interface Code_Executions_Repository {

    List<Code_Executions> get_exe_data_by_date(String date);

    List<Code_Executions> get_exe_data_by_language(String language);

    List<Code_Executions> get_exe_data_by_version(String version);

    List<Code_Executions> get_exe_data_by_user_id(String user_id);

    List<Code_Executions> get_exe_data_by_date_range(String date_0, String date_1);

    void record_execute(Code_Executions code_executions);

}
