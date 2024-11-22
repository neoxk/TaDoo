package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "task_list")
public class Tasklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_list_id;

    private String name;
    private int board_id;
}
