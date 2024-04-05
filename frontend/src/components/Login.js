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
  const [selectedUserRole, setSelectedUserRole] = useState("user");
  const [responseData, setResponseData] = useState(null);
  
  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  async function postSignUpInfo(formData) {
    navigate("/newsfeed");
    const response = await axios({
      method: "post",
      url: "/api/v1/users/save",
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: selectedUserRole,
      },
    });

    if (response.data !== null) {
      setResponseData(response.data);
    }
    
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);      
    }

    if (response.data!== null && response.data.status === "success") {
      navigate("/newsfeed");
    }
  }

  function showWarningToast(message) {
    toast.warn(message, { 
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
          postSignUpInfo(values);
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

