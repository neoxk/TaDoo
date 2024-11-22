package si.feri.ris.kirbis.todo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.User;
import si.feri.ris.kirbis.todo.services.UserService;

@RestController
@RequestMapping(path= "/api/user")
public class UserController {

    private UserService service;

    public UserController(UserService service) { this.service = service; }

    @PostMapping("")
    public ResponseEntity<String> create(@RequestBody User user) {
        service.create(user);
        return ResponseEntity.ok("Created");
    }
}
