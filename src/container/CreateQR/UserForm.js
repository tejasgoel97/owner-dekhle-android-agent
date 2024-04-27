import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

const UserForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigation = useNavigation(); // Get navigation object using hook

  const handleCreateTempId = () => {
    // Logic to create a temporary ID can be simulated here
    const tempId = "TID123"; // Example temporary ID
    const status = "Pending"; // Example status
    console.log("Creating Temp ID with:", selectedOption, phoneNumber);
    // Navigate to TempIDScreen with parameters
    navigation.navigate("TempIDScreen", {
      tempId: tempId,
      phoneNumber: phoneNumber,
      status: status,
    });
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedOption(value)}
        items={[
          { label: "Two Wheeler", value: "Two Wheeler" },
          { label: "Three Wheeler", value: "Three Wheeler" },
          { label: "Four Wheeler", value: "Four Wheeler" },
        ]}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "Select an option...", value: null }}
      />
      <Input
        placeholder="Phone Number"
        leftIcon={{ type: "font-awesome", name: "phone", color: "black" }}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        inputStyle={styles.inputText}
        inputContainerStyle={styles.inputContainer}
      />
      <Button
        title="Create Temp ID"
        onPress={handleCreateTempId}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputText: {
    color: "black",
  },
  inputContainer: {
    borderBottomColor: "black",
  },
  button: {
    backgroundColor: "black",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginBottom: 20,
  },
});

export default UserForm;
