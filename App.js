import React from "react";
import { ThemeProvider, Text, Button, Input } from "@rneui/themed";
import LoginScreen from "./src/screens/LoginScreen"; // make sure the path is correct
import CreateQRScreen from "./src/screens/CreateQRScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TempIDScreen from "./src/screens/TempIDScreen";
import TempIDListScreen from "./src/screens/TempIDListScreen";
import MyAgentsScreen from "./src/screens/MyAgentsScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import Toast from "react-native-toast-message";

const theme = {
  colors: {
    primary: "black",
    white: "#FFFFFF",
    black: "#000000",
  },
  Button: {
    buttonStyle: {
      backgroundColor: "black",
      borderColor: "black",
    },
    titleStyle: {
      color: "white",
    },
  },
  Input: {
    inputStyle: {
      color: "black",
    },
    placeholderTextColor: "#888",
    inputContainerStyle: {
      borderBottomColor: "black",
    },
  },
  Text: {
    style: {
      color: "black",
    },
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateQRScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="CreateQRScreen" component={CreateQRScreen} />
          <Stack.Screen name="TempIDScreen" component={TempIDScreen} />
          <Stack.Screen name="TempIDListScreen" component={TempIDListScreen} />
          <Stack.Screen name="MyAgentsScreen" component={MyAgentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
