package com.Ada.vault.repository.overwatch.code_executions;

import com.Ada.vault.domain.overwatch.Code_Executions;

import java.sql.Timestamp;
import java.util.List;

public interface Code_Executions_Repository {

    List<Code_Executions> get_exe_data_by_date(String date);

    List<Code_Executions> get_exe_data_by_language(String language);

    List<Code_Executions> get_exe_data_by_version(String version);

    List<Code_Executions> get_exe_data_by_user_id(String user_id);

}
