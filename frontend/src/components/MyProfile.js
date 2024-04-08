// MyProfile.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/MyProfile.module.css";

function MyProfile() {
  const navigate = useNavigate();

  // Static user info and posts data for display
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: "Alumni",
    joiningYear: "2017"
  };

  const posts = [
    { id: 1, title: "First Post", content: "This is the first post content." },
    { id: 2, title: "Second Post", content: "This is the second post content." }
  ];

  return (
    <Container className="pt-3">
      <Row>
        <Col md={4}>
          <div className={styles.profileSection}>
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
            <p><strong>Joining Year:</strong> {userInfo.joiningYear}</p>
            <Button variant="primary" onClick={() => navigate("/editprofile")}>Edit Profile</Button>
          </div>
        </Col>
        <Col md={8}>
          <h2>My Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfile;
