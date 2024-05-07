import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dialog } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScanQRDialog = ({ isVisible, onClose, onCodeScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setScanned(false);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    onCodeScanned(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.dialogOverlay}
    >
      <Dialog.Title title="Scan QR Code" />
      <View style={styles.container}>
        {hasPermission === null ? (
          <Text>Requesting for camera permission...</Text>
        ) : hasPermission === false ? (
          <Text>No access to camera</Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <Text style={styles.maintext}>{text}</Text>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogOverlay: {
    backgroundColor: "white",
    width: "90%",
    height: "80%",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    position: "relative", // Ensure the camera view fits within the dialog
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "black",
  },
});

export default ScanQRDialog;
