import React from "react";
import { View, StyleSheet } from "react-native";
import TempIdList from "../container/CreateQR/TempIdList";

const tempIds = [
  {
    tempId: "TID123",
    phoneNumber: "123-456-7890",
    date: "2024-04-12",
    status: "Pending",
  },
  {
    tempId: "TID124",
    phoneNumber: "987-654-3210",
    date: "2024-04-13",
    status: "Done",
  },
];

const TempIDListScreen = () => {
  return (
    <View style={styles.container}>
      <TempIdList data={tempIds} />
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
