import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as style from "../styles/globalStyles";
import * as Yup from "yup";
import Link from "next/link";
import { Image } from "react-bootstrap";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("*"),
    password: Yup.string().required("*"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    // Simulate login logic (replace with actual authentication logic)
    console.log("Logging in with:", values);

    // Simulate API call or authentication process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form after submission
    setSubmitting(false);
  };


const colorCode=  "green";
  return (
    <style.SplashContainer>
      <div>
        <Image src="/images/logo.png" alt="logo" />
      </div>
      <style.LoginFormContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form_heading">
              <h1>LOGIN FORM</h1>
            </div>
            <div className="form-group">
              <div className="lable_error_wrap">
                <label htmlFor="email">Email:</label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <Field
                placeholder="Enter your email"
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <div className="lable_error_wrap">
                <label htmlFor="password">Password:</label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <Field
                placeholder="Enter your password"
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button" disabled={false}>
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </style.LoginFormContainer>
      {/* <div>
      <h2>Users from FutureTechStore:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div> */}
    </style.SplashContainer>
  );
};

export default LoginForm;
