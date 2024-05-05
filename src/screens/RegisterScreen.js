import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Text, Input } from "@rneui/themed";
import { getDealerName, register, verifyOTP } from "../services/dealerServices";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/actions";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [dealerPhoneNumber, setDealerPhoneNumber] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [dealerId, setDealerId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (value, setState) => {
    setState(value);
  };

  const verifyDealer = async () => {
    try {
      const result = await getDealerName(dealerPhoneNumber);
      if (result.success) {
        setDealerName(result.data.name);
        setDealerId(result.data.id);
        setIsVerified(true);
        Toast.show({
          type: "success",
          text1: "Verification Successful",
          text2: `Dealer ${result.data.name} has been successfully verified.`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: "Unable to verify dealer.",
        });
      }
    } catch (error) {
      //   console.error("Error verifying dealer phone number:", error);
      Toast.show({
        type: "error",
        text1: "Dealer Phone Number",
        text2: "Error during verification",
      });
    }
  };
  const validateInputs = () => {
    // Check for empty fields
    if (
      !name.trim() ||
      !phoneNumber.trim() ||
      !fatherName.trim() ||
      !aadharNo.trim() ||
      !dealerPhoneNumber.trim()
    ) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "All fields are required.",
      });
      return false;
    }

    // Check mobile number length
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      Toast.show({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Phone number must be 10 digits.",
      });
      return false;
    }

    // Check Aadhar number length
    if (aadharNo.length !== 12 || isNaN(aadharNo)) {
      Toast.show({
        type: "error",
        text1: "Invalid Aadhar Number",
        text2: "Aadhar number must be 12 digits.",
      });
      return false;
    }

    return true;
  };

  const handleRegistration = async () => {
    if (!otp || otp.length === 0) {
      Toast.show({
        type: "info",
        text1: "OTP Required",
        text2: "Please enter the OTP sent to your phone.",
      });
      return;
    }

    try {
      const result = await verifyOTP(phoneNumber, otp);
      console.log(result);
      console.log("reesult");
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "OTP Verified",
          text2: "Your phone number has been verified successfully.",
        });
        dispatch(setUserInfo(result.userInfo));

        navigation.navigate("HomeScreen"); // Or any other screen post-verification
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: "Failed to verify OTP. Please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Verification Error",
        text2: "An error occurred during OTP verification.",
      });
      console.error("OTP verification failed:", error);
    }
  };
  const handleOTPSend = async () => {
    if (!validateInputs()) {
      // Check if inputs are valid
      return; // Stop the registration process if validation fails
    }

    if (!isVerified) {
      Toast.show({
        type: "info",
        text1: "Verification Required",
        text2: "Please verify the dealer's phone number first.",
      });
      return;
    }

    const registrationData = {
      name,
      phoneNumber,
      fatherName,
      aadharNo,
      dealerPhoneNumber,
      dealerId,
    };

    try {
      const result = await register(registrationData);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "You have been registered successfully.",
        });
        setOtpSent(true);
        // navigation.navigate("HomeScreen");
      } else {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: result.message || "Failed to register.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: "An error occurred during registration. Please try again.",
      });
      console.error("Registration failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4>Register</Text>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={(text) => handleInputChange(text, setName)}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => handleInputChange(text, setPhoneNumber)}
        keyboardType="numeric"
      />
      <Input
        placeholder="Father's Name"
        value={fatherName}
        onChangeText={(text) => handleInputChange(text, setFatherName)}
      />
      <Input
        placeholder="Aadhar Number"
        value={aadharNo}
        onChangeText={(text) => handleInputChange(text, setAadharNo)}
        keyboardType="numeric"
      />
      <View style={styles.dealerPhoneContainer}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Dealer Phone Number"
            value={dealerPhoneNumber}
            onChangeText={(text) =>
              handleInputChange(text, setDealerPhoneNumber)
            }
            keyboardType="numeric"
            containerStyle={{ flex: 1 }}
          />
        </View>

        <Button
          title={isVerified ? "Verified" : "Verify"}
          onPress={verifyDealer}
          buttonStyle={isVerified ? styles.verifiedButton : {}}
          disabled={isVerified}
        />
      </View>
      {dealerName ? (
        <Text style={styles.dealerNameText}>Dealer Name: {dealerName}</Text>
      ) : null}
      {otpSent && (
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChangeText={(text) => handleInputChange(text, setOtp)}
          keyboardType="numeric"
        />
      )}
      {otpSent ? (
        <Button title="Register" onPress={handleRegistration} />
      ) : (
        <Button title="Send OTP" onPress={handleOTPSend} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  dealerPhoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottoml: 10,
  },
  verifiedButton: {
    backgroundColor: "green",
  },
  dealerNameText: {
    paddingBottom: 10,
    paddingLeft: 10,
    color: "green",
  },
});

export default RegisterScreen;
