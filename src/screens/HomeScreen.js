import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../store/actions";

const HomeScreen = ({ navigation }) => {
  async function printAsync() {
    const serializedState = await AsyncStorage.getItem("user-info");

    if (serializedState === null) {
      return undefined; // No state in AsyncStorage
    }
    const userInfoData = JSON.parse(serializedState);
    console.log("async", userInfoData);
  }
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user-info");
    Toast.show({
      type: "info",
      text1: "LoggedOut",
      text2: "Login Again To Continue",
    });
    dispatch(clearUserInfo());
  };
  return (
    <View style={styles.container}>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate("CreateQRScreen")}
      />
      <Button
        title="My Temp ID's"
        onPress={() => navigation.navigate("TempIDListScreen")}
      />
      <Button
        title="My Agents Screen"
        onPress={() => navigation.navigate("MyAgentsScreen")}
      />
      <Button
        title="My Points Screen"
        onPress={() => navigation.navigate("MyPointsScreen")}
      />
      <Button title="LogOut" onPress={() => handleLogout()} />
      {/* <Button
        title="My Points"
        onPress={() => navigation.navigate("MyPointsScreen")}
      />
      <Button
        title="My Seller"
        onPress={() => navigation.navigate("MySellerScreen")}
      />
      <Button
        title="My Profile"
        onPress={() => navigation.navigate("MyProfileScreen")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
