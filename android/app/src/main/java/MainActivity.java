import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.parcial.app.FirebasePlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(FirebasePlugin.class);
  }
}
