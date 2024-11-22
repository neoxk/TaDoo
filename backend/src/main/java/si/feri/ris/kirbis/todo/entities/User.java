package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    private String full_name;
    private String username;
    private String email;
    private String password_hash;

    public User(String full_name, String username, String email, String password_hash) {
        this.full_name = full_name;
        this.username = username;
        this.email = email;
        this.password_hash = password_hash;
    }
}
