package si.feri.ris.kirbis.todo.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class BoardTaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_task_list_id")
    private int boardTaskListId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_list_id")
    private Tasklist tasklist;
}
