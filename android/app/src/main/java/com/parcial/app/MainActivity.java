package com.parcial.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onStart() {
    super.onStart();
    registerPlugin(FirebasePlugin.class);
  }
}
