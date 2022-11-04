import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user } = useContext(AuthContext);

  //get data using query url
  const [orders, setOrders] = useState([]);

  //user er email jokhn change hole eta call hobe.
  useEffect(() => {
    fetch(`http://localhost:5005/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);

  //delete order from server and ui
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you want to delete this order!!");
    if (proceed) {
      fetch(`http://localhost:5005/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            alert("Order deleted successfully");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  ///Handle update
  const handleStatusUpdate = (id) => {
    const proceed = window.confirm("Are you want to update?");
    if (proceed) {
      fetch(`http://localhost:5005/orders/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "Approved" }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            alert("Order updated successfully");
            const remaining = orders.filter((odr) => odr._id !== id); //jeta update korbo seta bad die baki gula
            const approving = orders.find((odr) => odr._id === id); //jeta k approve korbo seta
            approving.status = "Approved";

            const newOrders = [approving, ...remaining];
            setOrders(newOrders);
          }
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>Delete</label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              handleDelete={handleDelete}
              handleStatusUpdate={handleStatusUpdate}
            ></OrderRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
