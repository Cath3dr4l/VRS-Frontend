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
  const { order, movies, profile, total } = location.state;
  console.log("order: ", order);
  return (
    <PDFViewer className="w-screen h-screen fixed top-0 z-[100]">
      <Document>
        <Page size="A4" style={tw("p-4 flex flex-row flex-wrap gap-4")}>
          <View style={tw("w-full mb-4")}>
            <Text style={tw("text-2xl font-bold ")}>DATADOG</Text>
            <View style={tw("flex justify-between")}>
              <Text style={tw("text-lg")}>Customer name: {profile.name}</Text>
              <Text style={tw("text-lg")}>Phone number: {profile.phone} </Text>
            </View>
          </View>
          <View style={tw("w-full")}>
            <View
              style={tw("flex flex-row justify-between font-semibold text-2xl")}
            >
              <Text>Movie Title</Text>
              <Text>Quantity</Text>
              <Text>Rent Duration</Text>
              <Text>Unit Price</Text>
              <Text>Total Price</Text>
            </View>
            {order.map((item) => {
              const movie = movies.find((movie) => movie._id === item.id);
              return (
                <>
                  {movie && (
                    <View
                      style={tw(
                        "flex flex-row justify-between font-semibold text-xl"
                      )}
                    >
                      <Text>{movie.name}</Text>
                      <Text>{item.quantity}</Text>
                      <Text>
                        {item.duration === 100
                          ? "Buy"
                          : item.duration + " week/s"}
                      </Text>
                      <Text>
                        {item.duration === 100
                          ? movie.buy_price
                          : movie.rent_price}
                      </Text>
                      <Text>
                        {item.duration === 100
                          ? movie.buy_price * item.quantity
                          : movie.rent_price * item.quantity * item.duration}
                      </Text>
                    </View>
                  )}
                </>
              );
            })}
          </View>
          <View style={tw("w-full mt-4")}>
            <Text style={tw("text-lg font-bold text-right")}>
              Total Price: {total}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
