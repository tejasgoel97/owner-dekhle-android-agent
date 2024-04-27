import React, { useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import ScanQRDialog from "../container/CreateQR/ScanQRDialog";
import UserForm from "../container/CreateQR/UserForm";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the Icon component

const CreateQRScreen = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [scannedCodes, setScannedCodes] = useState([]);

  const handleQRCodeScanned = (data) => {
    console.log("Scanned Data: ", data);
    const regex = /([^\/]{14})$/;
    const match = data.match(regex);

    if (match) {
      const code = match[1];

      if (scannedCodes.includes(code)) {
        Toast.show({
          type: "error",
          text1: "Duplicate Code",
          text2: "This QR code has already been scanned.",
        });
      } else {
        setScannedCodes((prev) => [...prev, code]);
        Toast.show({
          type: "success",
          text1: "QR Code Scanned",
          text2: "QR code added successfully.",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Scan Error",
        text2: "No valid QR code found.",
      });
    }
    setIsDialogVisible(false);
  };

  const handleRemoveCode = (codeToRemove) => {
    setScannedCodes(scannedCodes.filter((code) => code !== codeToRemove));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Open QR Scanner"
        onPress={() => setIsDialogVisible(true)}
      />
      {scannedCodes.map((code, index) => (
        <View key={index} style={styles.codeContainer}>
          <Text style={styles.codeText}>{code}</Text>
          <TouchableOpacity onPress={() => handleRemoveCode(code)}>
            <Icon name="cancel" size={24} color="#900" />
          </TouchableOpacity>
        </View>
      ))}
      <ScanQRDialog
        isVisible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        onCodeScanned={handleQRCodeScanned}
      />
      <UserForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  codeText: {
    fontSize: 16,
  },
});

export default CreateQRScreen;
