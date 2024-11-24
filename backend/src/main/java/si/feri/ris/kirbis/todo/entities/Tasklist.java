package si.feri.ris.kirbis.todo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "task_list")
@JsonIgnoreProperties({"boardId"})
public class Tasklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "task_list_id")
    private int tasklistId;

    private String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "board_id")
    @JsonIgnore
    private Board board;

    @Transient
    private List<Task> tasks;

}
