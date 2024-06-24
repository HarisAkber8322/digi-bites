import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";

const LoginForm = () => {
  const MainStore = useContext(MainStoreContext);
  const { isLoggedin, handleLogin } = MainStore;
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: MainStore.user.email,
    password: MainStore.user.password,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      await handleLogin(values);
      if (MainStore.isLoggedin) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
        <Form className="w-[400px] h-fit mx-auto p-6 rounded-lg shadow-lg bg-white">
          <Text
            themeDivClasses="font-bold text-xl flex justify-center mb-8"
            content={<>LOGIN FORM</>}
          />
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="mt-4 flex justify-between text-sm">
            <Link
              href="/forgetPassword"
              className="text-themeOrange hover:underline"
            >
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-themeOrange hover:underline">
              Sign Up
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="w-full py-2 px-4 mb-2 flex justify-center items-center bg-blue-600 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FontAwesomeIcon
                icon={faFacebookF}
                color="white"
                className="h-5 w-5 mr-2 "
              />
              Continue with Facebook
            </Button>
          </div>
          <div className="mt-2 flex justify-center">
            <Button className="w-full py-2 px-4 flex justify-center items-center border text-white bg-red-500 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FontAwesomeIcon
                icon={faGoogle}
                color="white"
                className="h-5 w-5 mr-2"
              />
              Continue with Google
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
