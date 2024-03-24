import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const InvoiceComponent = ({ order }) => {
  console.log("order: ", order);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Invoice</Text>
          {/* <Text>Order ID: {order.id}</Text>
          <Text>Order Date: {order.date}</Text>
          <Text>Order Total: {order.total}</Text> */}
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceComponent;
