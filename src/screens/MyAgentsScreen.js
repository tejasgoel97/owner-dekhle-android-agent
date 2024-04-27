import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListItem, Avatar, Text } from "@rneui/themed";

const MyAgentsScreen = () => {
  const agents = [
    {
      sNo: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      dateJoined: "2022-01-01",
    },
    {
      sNo: 2,
      name: "Jane Smith",
      phoneNumber: "987-654-3210",
      dateJoined: "2022-05-15",
    },
    {
      sNo: 3,
      name: "Alice Johnson",
      phoneNumber: "555-678-1234",
      dateJoined: "2022-07-20",
    },
    // More agents can be added here
  ];

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={{ uri: "https://via.placeholder.com/150" }} rounded />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.phoneNumber}</ListItem.Subtitle>
        <View style={styles.details}>
          <Text>Date Joined: {item.dateJoined}</Text>
          <Text>S.No: {item.sNo}</Text>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={agents}
        renderItem={renderItem}
        keyExtractor={(item) => item.sNo.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

export default MyAgentsScreen;
