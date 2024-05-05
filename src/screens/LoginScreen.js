import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "@rneui/themed";
import Toast from "react-native-toast-message";
import axios from "axios";
import { verifyOTP } from "../services/dealerServices";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/actions";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();

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

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.8:5000/api/auth/sendOTP",
        { phoneNumber }
      );
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "OTP Sent",
          text2: response.data.message,
        });
        setOtpSent(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to send OTP. Please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Unable to connect to the server.",
      });
      console.error("Send OTP Error:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await verifyOTP(phoneNumber, otp);
      console.log(result);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "OTP Verified",
          text2: "You have successfully logged in.",
        });
        dispatch(setUserInfo(result.userInfo));

        navigation.navigate("HomeScreen");
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: "Incorrect OTP, please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Verification Error",
        text2: "An error occurred while verifying OTP.",
      });
      console.error("Verify OTP Error:", error);
    }
  };

  const resetPhoneNumber = () => {
    // setPhoneNumber("");
    // setOtp("");
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
