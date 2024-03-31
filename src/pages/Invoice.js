import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: { flexDirection: "row", marginTop: 24 },

  logo: { width: 90 },

  reportTitle: { fontSize: 16, textAlign: "center" },

  addressTitle: { fontSize: 11, fontStyle: "bold" },

  invoice: { fontWeight: "bold", fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: "bold" },

  address: { fontWeight: 400, fontSize: 10 },

  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    color: "white",
    backgroundColor: "#aa132f",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },

  tbody2: { flex: 2, borderRightWidth: 1 },
});

const InvoiceTitle = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <Text style={styles.reportTitle}>VideoDog</Text>
    </View>
  </View>
);

const Address = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Invoice </Text>
        {/* <Text style={styles.invoiceNumber}>
          Invoice number: {"random number"}
        </Text> */}
      </View>
      <View>
        <Text style={styles.addressTitle}>DataDog HQ </Text>
        <Text style={styles.addressTitle}>IIT Kharagpur</Text>
      </View>
    </View>
  </View>
);

const UserAddress = ({ address }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View style={{ maxWidth: 200 }}>
        <Text style={styles.addressTitle}>Billing Address </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <Text style={styles.addressTitle}>
        {format(new Date(), "dd/MM/yyyy")}
      </Text>
    </View>
  </View>
);

const TableHead = () => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Movies</Text>
    </View>
    <View style={styles.theader}>
      <Text>Qty</Text>
    </View>
    <View style={styles.theader}>
      <Text>Buy/Rent</Text>
    </View>
    <View style={styles.theader}>
      <Text>Price</Text>
    </View>
    <View style={styles.theader}>
      <Text>Amount</Text>
    </View>
  </View>
);

const TableBody = ({ order, movies }) => {
  return (
    <>
      {order.map((item) => {
        const movie = movies.find((movie) => movie._id === item.id);
        return (
          <>
            {movie && (
              <Fragment key={item.id}>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{movie.name}</Text>
                  </View>
                  <View style={styles.tbody}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={styles.tbody}>
                    <Text>
                      {item.duration === 100
                        ? "Buy"
                        : item.duration + " week/s"}{" "}
                    </Text>
                  </View>
                  <View style={styles.tbody}>
                    <Text>
                      {item.duration === 100
                        ? movie.buy_price
                        : movie.rent_price}{" "}
                    </Text>
                  </View>
                  <View style={styles.tbody}>
                    <Text>
                      {item.duration === 100
                        ? movie.buy_price * item.quantity
                        : movie.rent_price * item.quantity * item.duration}
                    </Text>
                  </View>
                </View>
              </Fragment>
            )}
          </>
        );
      })}
    </>
  );
};

const TableTotal = ({ total }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total</Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>{total}</Text>
    </View>
  </View>
);

// Name, Quantity, Rent Duration/Buy, Unit Price, Total Price

const Invoice = () => {
  const location = useLocation();
  const { order, movies, profile, total } = location.state;
  return (
    <PDFViewer className="w-screen h-screen fixed top-0 z-[100]">
      <Document>
        <Page size="A4" style={styles.page}>
          <InvoiceTitle />
          <Address />
          <UserAddress
            address={profile.address ? profile.address : "Not Provided"}
          />
          <TableHead />
          <TableBody order={order} movies={movies} />
          <TableTotal total={total} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
