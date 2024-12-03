"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Text from "../../UI/Text";
import UserStoreContext from "../../../store/UserStore";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
import Div from "../../UI/Div";
const LoginForm = () => {
  const UserStore = useContext(UserStoreContext);
  const { handleLogin } = UserStore;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (
    user: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const  isSuccess  = await handleLogin(user);
      if (isSuccess) {
        console.log("Login successful");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid email or password. Please try again."); 
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <Div
            themeDivClasses="w-[400px] mx-auto p-6 rounded-lg shadow-lg"
            content={
              <>
                <Text
                  themeDivClasses="font-bold text-xl flex justify-center"
                  content={<>LOGIN To</>}
                />
                <div
                  onClick={() => UserStore.changePage("/")}
                  className="cursor-pointer"
                >
                  <Image
                    width={150}
                    height={135}
                    className="text-center m-auto mb-8"
                    src="/images/digibites.png"
                    alt="logo"
                  />
                </div>
                {errorMessage && (
                  <div className="text-red-500 text-sm mb-4">
                    {errorMessage}
                  </div>
                )}
                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-sm font-medium">
                    <Text themeDivClasses="" content={<> Email:</>} />
                  </label>
                  <Field
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                  />
                </div>
                <div className="relative mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    <Text themeDivClasses="" content={<> Password:</>} />
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-themeYellow text-xs absolute left-2 bottom-[-15px]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <div className="mt-4 flex justify-end text-sm">
                  {/* <Link
                    href="/forgetPassword"
                    className="text-themeOrange hover:underline"
                  >
                    Forgot Password?
                  </Link> */}
                  <Link
                    href="/signup"
                    className="text-themeOrange hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
