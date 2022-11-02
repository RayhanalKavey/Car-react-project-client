import React from "react";
import { Link } from "react-router-dom";
import signUpImage from "../../../assets/images/login/login.svg";

const SignUp = () => {
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Clicked");
  };

  return (
    <div className="hero w-full my-20 ">
      <div className="hero-content grid gap-20 grid-cols-1 lg:grid-cols-2 ">
        <div className="text-center lg:text-left">
          <img className="w-3/4 mx-auto" src={signUpImage} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100 py-10">
          <h1 className="text-5xl font-bold text-center ">Sign Up</h1>
          <form onSubmit={handleSignUp} className="card-body">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                {/* <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a> */}
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-secondary"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p className="text-center text-slate-500	">
            Already have an account?{" "}
            <Link className="text-[#F000B8] font-bold " to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
