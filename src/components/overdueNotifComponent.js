import React from "react";

const OverdueNotif = ({ order }) => {
  return <div className="text-white">{order.movieID.name}</div>;
};

export default OverdueNotif;
