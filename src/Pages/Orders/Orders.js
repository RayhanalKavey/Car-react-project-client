import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Orders = () => {
  const { user } = useContext(AuthContext);

  //get data using query url
  const [orders, setOrders] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5005/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);
  //user er email jokhn change hole eta call hobe.

  return <div>You have {orders.length} orders.</div>;
};

export default Orders;
