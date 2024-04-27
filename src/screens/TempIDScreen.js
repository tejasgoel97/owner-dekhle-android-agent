import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Button } from "@rneui/themed";

const TempIDScreen = ({ route }) => {
  const { tempId, phoneNumber, status } = route.params; // Assuming these are passed as params

  // Define colors for different statuses
  const statusColors = {
    Pending: "orange",
    Submitted: "blue",
    Done: "green",
    Expired: "red",
  };

  const openWhatsApp = () => {
    let url =
      "whatsapp://send?text=Your Temp ID: " + tempId + "&phone=" + phoneNumber;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const sendSMS = () => {
    let url = `sms:${phoneNumber}?body=Your Temp ID: ${tempId}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text h4>Temp ID: {tempId}</Text>
        <Text h4>Phone Number: {phoneNumber}</Text>
        <Text h4 style={{ color: statusColors[status] }}>
          Status: {status}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="WhatsApp Message" onPress={openWhatsApp} />
        <Button title="Send SMS" onPress={sendSMS} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default TempIDScreen;
