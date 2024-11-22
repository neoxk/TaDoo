package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
