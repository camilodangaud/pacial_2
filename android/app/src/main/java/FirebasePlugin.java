import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import java.util.HashMap;
import java.util.Map;

@CapacitorPlugin(name = "FirebasePlugin")
public class FirebasePlugin extends Plugin {
  private FirebaseAuth auth = FirebaseAuth.getInstance();
  private FirebaseFirestore db = FirebaseFirestore.getInstance();

  @PluginMethod
  public void registerUser(PluginCall call) {
    String name = call.getString("name");
    String lastName = call.getString("lastName");
    String email = call.getString("email");
    String password = call.getString("password");

    auth.createUserWithEmailAndPassword(email, password)
      .addOnSuccessListener(result -> {
        String uid = result.getUser().getUid();

        Map<String, Object> user = new HashMap<>();
        user.put("name", name);
        user.put("lastName", lastName);
        user.put("email", email);
        user.put("uid", uid);

        db.collection("users").document(uid).set(user)
          .addOnSuccessListener(aVoid -> {
            call.resolve();
          })
          .addOnFailureListener(e -> {
            call.reject("Error al guardar usuario: " + e.getMessage());
          });
      })
      .addOnFailureListener(e -> {
        call.reject("Error al registrar usuario: " + e.getMessage());
      });
  }

  @PluginMethod
  public void loginUser(PluginCall call) {
    String email = call.getString("email");
    String password = call.getString("password");

    auth.signInWithEmailAndPassword(email, password)
      .addOnSuccessListener(result -> {
        call.resolve();
      })
      .addOnFailureListener(e -> {
        call.reject("Error al iniciar sesión: " + e.getMessage());
      });
  }
}
