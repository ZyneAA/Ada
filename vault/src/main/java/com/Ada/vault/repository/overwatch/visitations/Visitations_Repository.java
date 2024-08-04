package com.Ada.vault.repository.overwatch.visitations;

import com.Ada.vault.domain.overwatch.Visitations;

import java.util.List;

public interface Visitations_Repository {

    List<Visitations> get_visitations_by_user_id(Long user_id);

    List<Visitations> get_visitations_by_last_login(String last_login);

    List<Visitations> get_visitations_by_last_login_range(String last_login_0, String last_login_1);

    List<Visitations> get_visitations_by_last_visit(String last_visit);

    List<Visitations> get_visitations_by_last_visit_range(String last_visit_0, String last_visit_1);

    void insert_visitation(Visitations visitations);

    void update_visitation(Visitations visitations);

}
