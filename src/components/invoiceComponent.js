import React from "react";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

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

const InvoiceComponent = ({ order }) => {
  console.log("order: ", order);
  return (
    <PDFViewer width="100%" height="650px">
      <Document>
        <Page size="A4" style={tw("p-4 flex flex-col")}>
          <View style={tw("mb-4")}>
            <Text style={tw("text-2xl font-bold")}>Invoice</Text>
            <View style={tw("flex flex-row justify-between")}>
              <Text style={tw("text-lg")}>Customer name:</Text>
              <Text style={tw("text-lg")}>Phone number:</Text>
            </View>
          </View>
          <View style={tw("flex-grow")}>
            <Text style={tw("text-lg font-bold")}>Invoice Items:</Text>
            <View style={tw("flex flex-row justify-between")}>
              <Text style={tw("font-bold")}>Name</Text>
              <Text style={tw("font-bold")}>Quantity</Text>
              <Text style={tw("font-bold")}>Rent Duration/Buy</Text>
              <Text style={tw("font-bold")}>Unit Price</Text>
              <Text style={tw("font-bold")}>Total Price</Text>
            </View>
            {order.map((item) => (
              <View key={item.id} style={tw("flex flex-row justify-between")}>
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.rentDuration}</Text>
                <Text>{item.unitPrice}</Text>
                <Text>{item.totalPrice}</Text>
              </View>
            ))}
          </View>
          <View style={tw("mt-4")}>
            <Text style={tw("text-lg font-bold")}>Footer:</Text>
            <View style={tw("flex flex-row justify-between")}>
              <Text style={tw("font-bold")}>Final Price:</Text>
              <Text style={tw("font-bold")}>$FINAL_PRICE$</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoiceComponent;
