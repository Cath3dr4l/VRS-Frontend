import React from "react";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useLocation } from "react-router-dom";

const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "cornflowerblue",
      },
    },
  },
});

// Name, Quantity, Rent Duration/Buy, Unit Price, Total Price

const Invoice = () => {
  const location = useLocation();
  const { order } = location.state;
  const { profile } = location.state;
  const { total } = location.state;
  console.log("order: ", order);
  return (
    <PDFViewer className="w-screen h-screen fixed top-0 z-[100]">
      <Document>
        <Page size="A4" style={tw("p-4 flex flex-row flex-wrap gap-4")}>
          <View style={tw("w-full mb-4")}>
            <Text style={tw("text-2xl font-bold")}>Invoice</Text>
            <View style={tw("flex flex-row justify-between")}>
              <Text style={tw("text-lg")}>Customer name: {profile.phone}</Text>
              <Text style={tw("text-lg")}>Phone number: {} </Text>
            </View>
          </View>
          <View style={tw("w-full")}>
            <View style={tw("flex flex-row justify-between")}>
              <Text>Movie Title</Text>
              <Text>Quantity</Text>
              <Text>Rent Duration</Text>
              <Text>Unit Price</Text>
              <Text>Total Price</Text>
            </View>
            {order.map((item) => (
              <View style={tw("flex flex-row justify-between")}>
                <Text>Item Name {item.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>Rent Time{item.rentDuration}</Text>
                <Text>Ek ka Price{item.unitPrice}</Text>
                <Text>Total Price{item.totalPrice}</Text>
              </View>
            ))}
          </View>
          <View style={tw("w-full mt-4")}>
            <Text style={tw("text-lg font-bold")}>Total Price: {total}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
