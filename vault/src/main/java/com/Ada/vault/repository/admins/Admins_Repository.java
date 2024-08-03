package com.Ada.vault.repository.admins;

import com.Ada.vault.domain.admins.Admin;

public interface Admins_Repository {

    Admin find_admin_by_admin_name(String admin_name);

    Admin find_admin_by_admin_id(Long id);

}
