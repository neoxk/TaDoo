package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.User;
import si.feri.ris.kirbis.todo.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repository;

    @Override
    public void create(User user) {
        System.out.println("Creating user: " + user.getUsername());
        repository.save(user);
    }
}
