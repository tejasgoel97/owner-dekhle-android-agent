import React from "react";
import { View, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
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
