import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

export default function Login() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character"
      ),
  });

  async function sendData(values) {
    let toastLoadingId = toast.loading("Waiting...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setEmailOrPasswordError(errorMessage);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page for Fresh Cart website" />
      </Helmet>
      <section className="px-4 py-10">
        <div className="inear">
          <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-200">
            Login Now
          </h2>
          <form className="py-8 space-y-2" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="email">
              <label
                htmlFor="email"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="form-control w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="password">
              <label
                htmlFor="password"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="form-control w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                  {...formik.getFieldProps("password")}
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-[10px] top-[8px] cursor-pointer"
                >
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash text-gray-500 text-lg"></i>
                  ) : (
                    <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
                  )}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{formik.errors.password}
                </p>
              )}
              {emailOrPasswordError && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{emailOrPasswordError}
                </p>
              )}
            </div>

            {/* Submit Button & Forgot Password */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`bg-green-500 rounded-lg py-2 px-8 text-white text-xl my-3 ${
                  !formik.isValid || formik.isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {formik.isSubmitting ? "Loading..." : "Login"}
              </button>
              <Link
                to={"/forgetPassword"}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
