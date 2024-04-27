import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const TempIdList = ({ data }) => {
  const navigation = useNavigation(); // Hook to get access to the navigation object

  // Function to handle item press
  const handlePress = (item) => {
    navigation.navigate("TempIDScreen", {
      tempId: item.tempId,
      phoneNumber: item.phoneNumber,
      date: item.date,
      status: item.status,
    });
  };

  // Rendering each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Card>
        <Card.Title>Temp ID: {item.tempId}</Card.Title>
        <Card.Divider />
        <Text style={styles.itemText}>Phone Number: {item.phoneNumber}</Text>
        <Text style={styles.itemText}>Date: {item.date}</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.tempId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TempIdList;
