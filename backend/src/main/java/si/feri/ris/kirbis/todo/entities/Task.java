package si.feri.ris.kirbis.todo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

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

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "tag_id", referencedColumnName = "tag_id")
    private Tag tag;

    private String file_path;
    private boolean has_file;

    @CreationTimestamp
    private Timestamp created;

    private Timestamp finished;

    private String dwm;

}
