import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, logIn, googleLogin } = useContext(AuthContext);

  //------------- redirect user
  const navigate = useNavigate();
  //------------- user location where they want to go
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //LogIn/sign up with google
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        alert("Logged in successfully!!");

        //Navigate user to the desired path
        navigate(from, { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    //Log In with email and password
    logIn(email, password)
      .then((result) => {
        const user = result.user;

        //workinG get jwt token starT
        const currentUser = {
          email: user.email,
        };
        fetch(`http://localhost:5005/jwt`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            //local storage is the easiest but not the best place to store jwt token
            localStorage.setItem("genius-token", data.token);
            //Navigate user to the desired path
            setUser(user);
            navigate(from, { replace: true });
            toast.success("User logged in successfully.");
          });
        // get jwt token enD

        event.target.reset();
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
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
            <button onClick={handleGoogleLogin}>Google</button>
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
