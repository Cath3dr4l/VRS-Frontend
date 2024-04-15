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

import React from "react";
import { Svg, Path } from "@react-pdf/renderer";

function IconMailFill(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ maxWidth: "14px" }}
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z" />
    </Svg>
  );
}

function IconPhone(props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      fill="currentColor"
      style={{ maxWidth: "13px" }}
      {...props}
    >
      <Path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64c0 247.4 200.6 448 448 448 18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368c-70.4-33.3-127.4-90.3-160.7-160.7l49.3-40.3c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
    </Svg>
  );
}

function IconMailSendFill(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ maxWidth: "14px" }}
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M2 5.5V3.993A1 1 0 012.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 01-.992.993H2.992A.993.993 0 012 20.007V19h18V7.3l-8 7.2-10-9zM0 10h5v2H0v-2zm0 5h8v2H0v-2z" />
    </Svg>
  );
}

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
        <Text style={styles.addressTitle}>CONTACT US AT: </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}
        >
          <IconPhone /> <Text style={styles.address}> +91 9606890317</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}
        >
          <IconMailFill />{" "}
          <Text style={styles.address}>datadoghps@gmail.com </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: "5px" }}
        >
          <IconMailSendFill />
          <View>
            <Text style={styles.address}>DataDog HQ, </Text>
            <Text style={styles.address}>{"\t"}IIT Kharagpur,</Text>
            <Text style={styles.address}>West Bengal, India</Text>
          </View>
        </View>
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
