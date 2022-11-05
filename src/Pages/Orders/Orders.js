import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logout } = useContext(AuthContext);

  //get data using query url
  const [orders, setOrders] = useState([]);

  //user er email jokhn change hole eta call hobe. //notE get from local storage jwt. Api call korle backend e authorization information ta pathai dibe
  useEffect(() => {
    fetch(`http://localhost:5005/orders?email=${user?.email}`, {
      // workinG
      headers: {
        authorization: ` Bearer ${localStorage.getItem("genius-token")}`, //this information will be sent to back end
      },
    })
      .then((res) => {
        // workinG
        if (res.status === 401 || res.status === 403) {
          return logout();
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [user?.email, logout]);

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
    <div>
      <h3 className="text-5xl text-center my-5">
        You have {orders.length} Orders
      </h3>
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
    </div>
  );
};

export default Orders;
