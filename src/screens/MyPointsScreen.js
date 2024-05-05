import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { Badge } from "@rneui/themed";

const MyPointsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchedTransactions = [
      {
        transactionType: "ADDED",
        amount: 150,
        reason: "Bonus for extra deliveries",
        vehicleType: "Two Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Achieved top delivery speeds consistently.",
      },
      {
        transactionType: "REMOVED",
        amount: 75,
        reason: "Maintenance fee",
        vehicleType: "Three Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Quarterly vehicle maintenance.",
      },
      {
        transactionType: "ADDED",
        amount: 50,
        reason: "Referral bonus",
        vehicleType: "Two Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Referred Jane Smith.",
      },
      {
        transactionType: "REMOVED",
        amount: 30,
        reason: "Traffic violation fine",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Ran a red light during delivery hours.",
      },
      {
        transactionType: "ADDED",
        amount: 100,
        reason: "Holiday work bonus",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Worked on a national holiday.",
      },
      {
        transactionType: "ADDED",
        amount: 200,
        reason: "Year-end bonus",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Exceptional performance throughout the year.",
      },
      {
        transactionType: "REMOVED",
        amount: 50,
        reason: "Penalty for late starts",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Multiple late starts detected this month.",
      },
      {
        transactionType: "ADDED",
        amount: 50,
        reason: "Referral bonus",
        vehicleType: "Two Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Referred Jane Smith.",
      },
      {
        transactionType: "REMOVED",
        amount: 30,
        reason: "Traffic violation fine",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Ran a red light during delivery hours.",
      },
      {
        transactionType: "ADDED",
        amount: 100,
        reason: "Holiday work bonus",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Worked on a national holiday.",
      },
      {
        transactionType: "ADDED",
        amount: 200,
        reason: "Year-end bonus",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Exceptional performance throughout the year.",
      },
      {
        transactionType: "REMOVED",
        amount: 50,
        reason: "Penalty for late starts",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Multiple late starts detected this month.",
      },
      {
        transactionType: "ADDED",
        amount: 50,
        reason: "Referral bonus",
        vehicleType: "Two Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Referred Jane Smith.",
      },
      {
        transactionType: "REMOVED",
        amount: 30,
        reason: "Traffic violation fine",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Ran a red light during delivery hours.",
      },
      {
        transactionType: "ADDED",
        amount: 100,
        reason: "Holiday work bonus",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Worked on a national holiday.",
      },
      {
        transactionType: "ADDED",
        amount: 200,
        reason: "Year-end bonus",
        vehicleType: "Heavy Vehicle",
        transactionDate: new Date().toISOString(),
        comments: "Exceptional performance throughout the year.",
      },
      {
        transactionType: "REMOVED",
        amount: 50,
        reason: "Penalty for late starts",
        vehicleType: "Four Wheeler",
        transactionDate: new Date().toISOString(),
        comments: "Multiple late starts detected this month.",
      },
    ];
    setTransactions(fetchedTransactions);
    setTotalPoints(
      fetchedTransactions.reduce(
        (acc, curr) =>
          curr.transactionType === "ADDED"
            ? acc + curr.amount
            : acc - curr.amount,
        0
      )
    );
  }, []);

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.dateAmountContainer}>
        {/* Update date format to include time */}
        <Text style={styles.dateText}>
          {new Date(item.transactionDate).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Text>
        <Text
          style={
            item.transactionType === "ADDED"
              ? styles.amountAdded
              : styles.amountRemoved
          }
        >
          {item.transactionType === "ADDED"
            ? `+${item.amount}`
            : `-${item.amount}`}
        </Text>
      </View>
      <Text style={styles.commentsText}>{item.comments}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTransactionItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dateAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    color: "blue",
    flex: 1, // Ensure text does not overflow
  },
  amountAdded: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginLeft: 10, // Ensure some spacing between the date and amount
  },
  amountRemoved: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
  },
  commentsText: {
    fontStyle: "italic",
    color: "#666",
    paddingTop: 5,
  },
});

export default MyPointsScreen;
