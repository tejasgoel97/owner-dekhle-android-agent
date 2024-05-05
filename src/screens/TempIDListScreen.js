import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import TempIdList from "../container/CreateQR/TempIdList";
import { useSelector } from "react-redux";
import axios from "axios";

const TempIDListScreen = () => {
  const [tempIds, setTempIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.userInfo.token); // Accessing token from Redux state

  useEffect(() => {
    const fetchTempIds = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://192.168.1.8:5000/api/QR/get-my-temp-ids",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setTempIds(
            response.data.tempIDs.map((id) => ({
              tempId: id.id,
              phoneNumber: id.phoneNumber,
              date: new Date(id.createdAt).toLocaleDateString(),
              status: id.status.toUpperCase(),
            }))
          );
        } else {
          // Handle failure
          console.error("Failed to fetch temp IDs");
        }
      } catch (error) {
        console.error("Error fetching temp IDs:", error);
      }
      setLoading(false);
    };

    fetchTempIds();
  }, [token]); // Dependency array ensures useEffect runs when token changes

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TempIdList data={tempIds} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TempIDListScreen;
