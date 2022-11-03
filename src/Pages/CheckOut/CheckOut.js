import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { img, title, price, service_id, _id, description, facility } =
    useLoaderData();

  const { user } = useContext(AuthContext);
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "Unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };
  };

  return (
    <form onSubmit={handlePlaceOrder} action="" className="">
      <h1 className="text-4xl text-center my-5">
        You are about to order: {title}
      </h1>
      <h4 className="text-2xl text-center ">{price}</h4>
      {/* Form  body starT*/}
      <div className="bg-gray-200 p-20 mt-10 mb-20 border rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            className="input input-bordered w-full "
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            className="input input-bordered w-full "
          />
          <input
            name="phone"
            type="text"
            placeholder="Your phone"
            className="input input-bordered w-full "
          />
          <input
            name="email"
            type="text"
            placeholder="Your email"
            defaultValue={user?.email}
            className="input input-bordered w-full "
            readOnly
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-bordered h-56 w-full my-5 "
          placeholder="Your message"
        ></textarea>

        <input
          className="btn btn-secondary"
          type="submit"
          value="Place your order"
        />
      </div>
      {/* Form body enD */}
    </form>
  );
};

export default CheckOut;
