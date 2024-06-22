package com.Ada.vault.repository.user_setting;

import com.Ada.vault.domain.User_Settings;

public interface User_Settings_Repository {

    void add_user_id(Long user_id);

    void update_user_settings(User_Settings user_settings);

}
