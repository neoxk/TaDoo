package si.feri.ris.kirbis.todo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({"tasklists"})
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;

    private String name;

    private int userId = 1;

    @OneToMany(mappedBy = "board")
    private List<Tasklist> tasklists;

}
