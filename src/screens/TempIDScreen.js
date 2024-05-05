import React, { useEffect, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Text, Button, Card } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import RNPickerSelect from "react-native-picker-select";
import api from "../services/api";

const TempIDScreen = ({ route }) => {
  const { tempId } = route.params;
  const [tempDetails, setTempDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);
  const token = useSelector((state) => state.userInfo.token);
  console.log({ tempId });
  useEffect(() => {
    fetchTempDetails();
  }, [tempId, token]);

  const fetchTempDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/QR/get-temp-id?tempId=${tempId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data) {
        setTempDetails(response.data);
        setStatus(response.data.status);
      } else {
        Toast.show({
          type: "error",
          text1: "Fetch Error",
          text2: "No data received from server.",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Unable to fetch temp ID details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusOptions = () => {
    switch (status) {
      case "PENDING":
        console.log("here");
        return [{ label: "CANCELLED", value: "CANCELLED" }];
      case "SUBMITTED":
        return [
          { label: "CANCELLED", value: "CANCELLED" },
          { label: "COMPLETED", value: "COMPLETED" },
        ];
      default:
        return [];
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchTempDetails} />
      }
    >
      {tempDetails ? (
        <Card>
          <Card.Title style={styles.cardTitle}>Temp ID Details</Card.Title>
          <Card.Divider />
          <Text style={styles.infoText}>Temp ID: {tempDetails.id}</Text>
          <Text style={styles.infoText}>
            Phone Number: {tempDetails.phoneNumber}
          </Text>
          <Text style={styles.infoText}>Status: {tempDetails.status}</Text>
          <RNPickerSelect
            onValueChange={(value) => setNewStatus(value)}
            items={getStatusOptions()}
            placeholder={{ label: "Change status...", value: null }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Icon name="arrow-drop-down" size={24} color="gray" />;
            }}
          />
          <Button
            icon={<Icon name="refresh" size={20} color="white" />}
            title=" Refresh"
            onPress={fetchTempDetails}
          />
        </Card>
      ) : (
        <Text style={styles.loadingText}>Loading or no data available...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: "#333",
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#666",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
};

export default TempIDScreen;
