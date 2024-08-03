package com.Ada.vault.domain.overwatch;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "visitations")
public class Visitations {

    @OneToOne
    @NotNull
    private Long user_id;

    @NotBlank()
    private Timestamp last_visited;

    @NotBlank()
    private Timestamp last_login;

    public Long get_user_id() {

        return this.user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public Timestamp get_last_visited() {

        return this.last_visited;

    }

    public void set_last_visited(Timestamp last_visited) {

        this.last_visited = last_visited;

    }

    public Timestamp get_last_login() {

        return this.last_login;

    }

    public void set_last_login(Timestamp last_login) {

        this.last_login = last_login;

    }

}
