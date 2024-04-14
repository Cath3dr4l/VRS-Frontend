import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import font from "../fonts/brandon-grotesque-black-58a8a3e824392.otf";

Font.register({
  family: "Brandon-Grotesque-Black",
  src: font,
});

Font.register({
  family: "Raleway-Bold",
  src: "https://fonts.gstatic.com/s/raleway/v22/1Ptrg8zYS_SKggPNwIYqWqhPAMif.ttf",
});

Font.register({
  family: "Poppins",
  src: "https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2",
});

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
    // marginBottom: 24,
  },

  reportTitle: {
    paddingTop: 20,
    fontSize: 30,
    textAlign: "right",
    // fontFamily: "Brandon-Grotesque-Black",
  },

  titleContainer: { flexDirection: "row", marginTop: 24 },

  addressTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },

  invoice: { fontWeight: "bold", fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: "bold" },

  address: { fontWeight: 400, fontSize: 11 },

  theader: {
    marginTop: 20,
    fontSize: 12,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 24,
    color: "white",
    backgroundColor: "#aa132f",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 10,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 10,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },

  tbody2: { fontSize: 11, fontStyle: "bold", flex: 2, borderRightWidth: 1 },
});

const InvoiceTitle = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Image style={{ width: 200 }} src={"logo_videodog.png"} />
      <Text style={styles.reportTitle}>INVOICE</Text>
    </View>
  </View>
);

const Address = () => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.addressTitle}>DataDog HQ, </Text>
        <Text style={styles.addressTitle}>IIT Kharagpur</Text>
      </View>
    </View>
  </View>
);

const UserAddress = ({ address, name }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View style={{ maxWidth: 200 }}>
        <Text style={styles.addressTitle}>INVOICE TO:</Text>
        <Text style={styles.address}>{name}</Text>
        <Text style={styles.addressTitle}>BILLING ADDRESS: </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={{ maxWidth: 250 }}>
        <Text style={styles.addressTitle}>INVOICE DATE:</Text>
        <Text style={styles.addressTitle}>
          {format(new Date(), "dd/MM/yyyy")}
        </Text>
      </View>
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
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      fontSize: 12,
      fontStyle: "bold",
    }}
  >
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={{ paddingRight: 70, paddingTop: 4 }}>
      <Text>TOTAL:</Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={{ paddingRight: 40, paddingTop: 4 }}>
      <Text> Rs. {total}</Text>
    </View>
  </View>
);

// Name, Quantity, Rent Duration/Buy, Unit Price, Total Price

const Invoice = () => {
  const location = useLocation();
  const [order, setOrder] = useState([]);
  const [movies, setMovies] = useState([]);
  const [profile, setProfile] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(location);
    if (!location.state) {
      window.location.replace("/cart");
    } else {
      setOrder(location.state.order);
      setMovies(location.state.movies);
      setProfile(location.state.profile);
      setTotal(location.state.total);
    }
  }, [location.state]);

  return (
    <PDFViewer className="w-screen h-screen fixed top-0 z-[100]">
      <Document>
        <Page size="A4" style={styles.page}>
          <InvoiceTitle />
          <Address />
          <UserAddress
            address={profile.address ? profile.address : "Not Provided"}
            name={profile.name}
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
