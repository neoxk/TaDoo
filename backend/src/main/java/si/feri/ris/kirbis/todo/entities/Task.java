package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;

    private String name;
    private boolean done;

    @Column(name = "task_list_id")
    private int tasklistId;
    private int tag_id;
}
