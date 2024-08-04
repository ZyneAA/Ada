package com.Ada.vault.domain.overwatch;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "code_executions")
public class Code_Executions {

    @Id
    private Long user_id;

    @NotBlank()
    private String date;

    @NotBlank()
    private String language;

    @NotBlank()
    private String version;

    public Long get_user_id() {

        return this.user_id;

    }

    public void set_user_id(Long user_id) {

        this.user_id = user_id;

    }

    public String get_date() {

        return this.date;

    }

    public void set_date(String date) {

        this.date = date;

    }

    public String get_language() {

        return this.language;

    }

    public void set_language(String language) {
        this.language = language;
    }

    public String get_version() {
        return version;
    }

    public void set_version(String version) {
        this.version = version;
    }

}