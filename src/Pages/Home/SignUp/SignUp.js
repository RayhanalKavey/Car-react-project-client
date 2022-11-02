import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import signUpImage from "../../../assets/images/login/login.svg";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  // Check the input errors
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });

  // User input from the form
  const [userInformation, setUserInformation] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  // Name change handler
  const handleNameChange = (event) => {
    setUserInformation({ ...userInformation, name: event.target.value });
  };

  //Photo URL change handler
  const handlePhotoURLChange = (event) => {
    setUserInformation({ ...userInformation, photoURL: event.target.value });
  };

  //email change handler
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
      setInputErrors({
        ...inputErrors,
        email: "Please enter a valid email",
      });
      setUserInformation({ ...userInformation, email: "" }); //reset email if user change the correct email when typed
    } else {
      setInputErrors({
        ...inputErrors,
        email: "",
      });
      setUserInformation({ ...userInformation, email: emailValue });
    }
  };

  //email change handler with errors
  const emailErrorMessage = (message) => {
    return setInputErrors({
      ...inputErrors,
      password: message,
    });
  };

  const passResetWhenNotValid = () => {
    return setUserInformation({ ...userInformation, password: "" });
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    if (!/(?=.{6,})/.test(passwordValue)) {
      emailErrorMessage("password must be 6 character");
      passResetWhenNotValid();
    } else if (!/(?=.*[a-zA-Z])/.test(passwordValue)) {
      emailErrorMessage("password should have Upper letter!!");
      passResetWhenNotValid();
    } else if (!/(?=.*[!#@$%&? "])/.test(passwordValue)) {
      emailErrorMessage("password should have special character!!");
      passResetWhenNotValid();
    } else {
      emailErrorMessage("");
      setUserInformation({ ...userInformation, password: passwordValue });
    }
  };

  //Handle submit button
  const handleSignUp = (event) => {
    event.preventDefault();
    const name = userInformation?.name;
    const photoURL = userInformation?.photoURL;
    const email = userInformation?.email;
    const password = userInformation?.password;
    console.log(name);
    console.log(photoURL);
    console.log(email);
    console.log(password);
    event.target.reset();
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
                onChange={handleNameChange}
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            {/* PhotoURL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                onChange={handlePhotoURLChange}
                type="text"
                name="photoURL"
                placeholder="photoURL"
                className="input input-bordered"
              />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={handleEmailChange}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              <label className="label text-orange-400">
                {inputErrors.email}
              </label>
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label text-orange-400">
                {inputErrors.password}
              </label>
              {/* notE For reset the password */}
              {/* <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
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
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
