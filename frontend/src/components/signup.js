import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { Dropdown, DropdownButton } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BsFillPersonPlusFill } from "react-icons/bs";

import styles from "./styles/signup.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from './assets/ca.jpeg';

function SignUp() {

  const [resData, setResData] = useState(null);
  
  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().matches(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format').required(),
    password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userType: yup.string().required()
  });

  async function postSignUpInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/users/save",
      data: {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        email: inputData.email,
        password: inputData.password,
        userType: inputData.userType,
      },
    });

    if (response.data !== null) {
      setResData(response.data);
    }
    
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);      
    }

    if (response.data!== null && response.data.status === "success") {
      navigate("/login");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
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
          userType: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          postSignUpInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
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
              <Row className="mb-3 justify-content-center text-center">
                <Col md="auto" className="mb-sm-0 mb-3">
                  <img src={logo} width="200" alt="Cuse Alumni Groves logo" />
                </Col>
              </Row>
            <Row className="mb-2 text-center">
              <h1 className="heading">Welcome to <span className={styles.inlinetext}>Cuse Alumni Groves</span></h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  className={styles.inputstyle}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  className={styles.inputstyle}
                  onChange={handleChange}
                  isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInUserType">
                <Form.Label>User Type</Form.Label>
                <DropdownButton
                            id="dropdown-basic-button"
                            title={values.userType ? values.userType : 'Select Role'}
                        >
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'userType', value: 'Student' } })}>Student</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChange({ target: { name: 'userType', value: 'Alumni' } })}>Alumni</Dropdown.Item>
                </DropdownButton>
                <Form.Control.Feedback type="invalid">
                {errors.userType}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  className={styles.inputstyle}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  className={styles.inputstyle}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button type="submit" className="mt-2 button">
              Sign Up <BsFillPersonPlusFill />
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignUp;
