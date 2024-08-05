package com.Ada.vault.domain.overwatch;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "visitations")
public class Visitations {

    @Id
    private Long user_id;

    @NotBlank()
    private String last_visit;

    @NotBlank()
    private String last_login;

    public Long get_user_id() {

        return this.user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public String get_last_visit() {

        return this.last_visit;

    }

    public void set_last_visit(String last_visited) {

        this.last_visit = last_visited;

    }

    public String get_last_login() {

        return this.last_login;

    }

    public void set_last_login(String last_login) {

        this.last_login = last_login;

    }

}
