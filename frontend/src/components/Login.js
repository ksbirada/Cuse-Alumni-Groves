import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BsFillPersonPlusFill } from "react-icons/bs";

import styles from "./styles/Login.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });
    
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }
    
    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);
      console.log(response)
      
      localStorage.setItem("userId", response.data.payload.id);
      localStorage.setItem("firstName", response.data.payload.firstName);
      localStorage.setItem("lastName", response.data.payload.lastName);
      localStorage.setItem("email", response.data.payload.email);
      navigate("/newsfeed");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }


  return (
    <Container fluid className={styles.container}> 
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer} 
          >
            <Row className="mb-2 text-center">
              <h1 className="heading">Welcome to <span className={styles.inlinetext}>Cuse Alumni Groves</span></h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="loginEmail"> 
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="loginPassword"> 
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Sign In <RiLoginBoxLine />
            </Button>
            <Row className="mt-3">
              <Col className="text-center">
              <span>Don't have an account?</span>{" "}
                <Link to="/signup">Sign Up</Link>
              </Col>
            </Row> 
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;

