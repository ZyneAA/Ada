package com.Ada.vault.repository.settings;

import com.Ada.vault.domain.settings.Profile;

public interface Profiles_Repository {

    void add_user_id(Long user_id);

    void update_user_profile(Profile profile);

}
