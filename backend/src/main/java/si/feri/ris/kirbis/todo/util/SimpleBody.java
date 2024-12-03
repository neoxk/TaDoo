package si.feri.ris.kirbis.todo.util;

import java.util.HashMap;
import java.util.Map;

public class SimpleBody {
    public static Map<String, String> success() {
        Map<String, String> map = new HashMap<>();
        map.put("status", "success");
        return map;
    }
}
