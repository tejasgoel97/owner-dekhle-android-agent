import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "@rneui/themed";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneInput = (text) => {
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text);
    }
  };

  const handleOtpInput = (text) => {
    if (/^\d*$/.test(text)) {
      setOtp(text);
    }
  };

  const sendOtp = () => {
    console.log("OTP sent to:", phoneNumber);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    console.log("OTP verified for:", phoneNumber);
    navigation.navigate("HomeScreen");
  };

  const resetPhoneNumber = () => {
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <View>
          <Text h4>Enter your phone number</Text>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneInput}
            keyboardType="numeric"
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </View>
      ) : (
        <View>
          <Text h4>Enter OTP</Text>
          <Text style={styles.phoneNumberText}>Phone: {phoneNumber}</Text>
          <Input
            placeholder="OTP"
            value={otp}
            onChangeText={handleOtpInput}
            keyboardType="numeric"
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
          <Button title="Resend OTP" onPress={sendOtp} type="clear" />
          <TouchableOpacity onPress={resetPhoneNumber}>
            <Text style={styles.changePhoneText}>Change Phone Number</Text>
          </TouchableOpacity>
        </View>
      )}
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
  phoneNumberText: {
    fontSize: 16,
    marginVertical: 10,
  },
  changePhoneText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  registerText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "blue", // Style as per your app theme
  },
});

export default LoginScreen;
