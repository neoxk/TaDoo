package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int board_id;

    private String name;

    private int userId;

    public Board(String name, int user_id) {
        this.name = name;
        this.userId = user_id;
    }
}
