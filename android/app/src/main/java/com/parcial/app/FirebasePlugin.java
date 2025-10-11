package com.parcial.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CapacitorPlugin(name = "FirebasePlugin")
public class FirebasePlugin extends Plugin {
  private final FirebaseAuth auth = FirebaseAuth.getInstance();
  private final FirebaseFirestore db = FirebaseFirestore.getInstance();

  @PluginMethod
  public void registerUser(PluginCall call) {
    String name = call.getString("name");
    String lastName = call.getString("lastName");
    String email = call.getString("email");
    String password = call.getString("password");

    String birthDate = call.getString("birthDate");
    String country = call.getString("country");
    String city = call.getString("city");
    String gender = call.getString("gender");
    Boolean showGenderProfile = call.getBoolean("showGenderProfile", true);

    List<Object> passions = safeGetArray(call, "passions");
    List<Object> photos = safeGetArray(call, "photos");

    auth.createUserWithEmailAndPassword(email, password)
      .addOnSuccessListener(result -> {
        String uid = result.getUser().getUid();

        Map<String, Object> user = new HashMap<>();
        user.put("uid", uid);
        user.put("name", name);
        user.put("lastName", lastName);
        user.put("email", email);
        user.put("birthDate", birthDate);
        user.put("country", country);
        user.put("city", city);
        user.put("gender", gender);
        user.put("showGenderProfile", showGenderProfile);
        user.put("passions", passions);
        user.put("photos", photos);
        user.put("createdAt", System.currentTimeMillis());

        db.collection("users").document(uid).set(user)
          .addOnSuccessListener(aVoid -> {
            JSObject response = new JSObject();
            response.put("success", true);
            response.put("uid", uid);
            call.resolve(response);
          })
          .addOnFailureListener(e -> call.reject("Error al guardar usuario: " + e.getMessage()));
      })
      .addOnFailureListener(e -> call.reject("Error al registrar usuario: " + e.getMessage()));
  }

  @PluginMethod
  public void loginUser(PluginCall call) {
    String email = call.getString("email");
    String password = call.getString("password");

    auth.signInWithEmailAndPassword(email, password)
      .addOnSuccessListener(result -> {
        String uid = result.getUser().getUid();

        JSObject response = new JSObject();
        response.put("success", true);
        response.put("uid", uid);
        response.put("email", email);

        call.resolve(response);
      })
      .addOnFailureListener(e -> call.reject("Error al iniciar sesión: " + e.getMessage()));
  }

  private List<Object> safeGetArray(PluginCall call, String key) {
    try {
      if (call.hasOption(key) && call.getArray(key) != null) {
        return call.getArray(key).toList();
      }
    } catch (Exception ignored) {}
    return List.of();
  }
}
