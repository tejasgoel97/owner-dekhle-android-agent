// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Toast from "react-native-toast-message";
import AuthNavigator from "./src/navigation/AuthNavigator"; // Make sure the path is correct

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
