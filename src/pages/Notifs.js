import { useEffect, useState } from "react";
import { useStaffContext } from "../hooks/useStaffContext";
import StockNotif from "../components/stockNotifComponent";
import OverdueNotif from "../components/overdueNotifComponent";

const Notifs = () => {
  const { staff } = useStaffContext();
  const [notifs, setNotifs] = useState(null);
  useEffect(() => {
    const fetchNotifs = async () => {
      const response = await fetch("/api/staffs/notifs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staff.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
      } else {
        setNotifs(data);
      }
    };
    if (staff) {
      fetchNotifs();
    }
  }, [staff]);
  return (
    <div className="pt-16 p-4 w-full flow-root">
      {" "}
      {notifs && (
        <>
          <div className="w-[50%] float-left">
            {" "}
            <h1 className="text-2xl text-white font-semibold">
              Low Stock Movies
            </h1>
            {notifs.lowStockMovies.map((movie) => (
              <StockNotif movie={movie} />
            ))}
          </div>
          <div className="w-[50%] float-right">
            <h1 className="text-2xl text-white font-semibold">
              Over Due Orders
            </h1>
            {notifs.pastDueOrders.map((order) => (
              <OverdueNotif order={order} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Notifs;
