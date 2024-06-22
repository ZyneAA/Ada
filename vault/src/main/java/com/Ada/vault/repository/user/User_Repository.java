package com.Ada.vault.repository.user;

import com.Ada.vault.domain.User;

public interface User_Repository {

    void add(User user);

    void delete_user_by_username(String username);

    User find_user_by_username(String username);

    User find_user_by_user_id(Long id);

}
