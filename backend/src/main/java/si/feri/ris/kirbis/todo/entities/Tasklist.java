package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Tasklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tasklist_id;

    private String name;
    private int board_id;
}
