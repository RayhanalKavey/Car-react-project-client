import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/login/login.svg";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Clicked");
  };

  return (
    // min-h-screen bg-base-200
    <div className="hero w-full my-20 ">
      <div className="hero-content grid gap-20 grid-cols-1 lg:grid-cols-2 ">
        <div className="text-center lg:text-left">
          <img className="w-3/4 mx-auto" src={loginImage} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100 py-10">
          <h1 className="text-5xl font-bold text-center ">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
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
              {/* Password reset */}
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
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
            New to genius car?{" "}
            <Link className="text-[#F000B8] font-bold " to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
