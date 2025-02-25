import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "@rneui/themed";
import Toast from "react-native-toast-message";
import axios from "axios";
import { verifyOTP } from "../services/dealerServices";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/actions";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleUsernameInput = (text) => {
    setUsername(text);
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/email/login", {
        phoneNumber: username,
        email: username,
        password,
      });
      if (response.data.success) {
        const userInfo = response.data.userInfo;
        const serializedState = JSON.stringify(userInfo);
        console.log({ serializedState });
        await AsyncStorage.setItem("user-info", serializedState);
        dispatch(setUserInfo(userInfo));
        // Navigate to home screen or dashboard
        // navigation.navigate("HomeScreen");
      } else {
        // This part may not be reached if backend properly uses HTTP status codes
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response.data.message,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 specifically
        Toast.show({
          type: "error",
          text1: "Authentication Failed",
          text2: error.response.data.message,
        });
      } else {
        // General error handling
        Toast.show({
          type: "error",
          text1: "Login Error",
          text2: "An unexpected error occurred during login",
        });
        console.log("Login error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Enter your Email/Password</Text>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameInput}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text>Enter your password</Text>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordInput}
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerText}>Not a registered user? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  registerText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "blue",
  },
});

export default LoginScreen;
