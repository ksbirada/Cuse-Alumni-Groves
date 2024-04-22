// MyProfile.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/MyProfile.module.css";
import PostItem from "./PostItem";

function MyProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({})
  const [postData, setPostData] = useState([])

  useEffect(() => {
    
    const userId = "kkaulakh@syr.edu";

    // Fetch user data and posts from the database based on userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/get/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserInfo(data.payload);
        } else {
          console.error("Error fetching user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPostOfUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/getpost/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setPostData(data.payload);
        } else {
          console.error("Error fetching post data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchUserData();
    fetchPostOfUser();
  }, []);

  return (
    <Container className="pt-3">
      <Row>
        <Col md={4}>
          <div className={styles.profileSection}>
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.userType}</p>
            <Button variant="primary" onClick={() => navigate("/editprofile")}>Edit Profile</Button>
          </div>
        </Col>
        <Col md={8}>
          <h2>My Posts</h2>
          {postData.map((post, index) => (
            <PostItem
              key={post.id}
              postId={post.id}
              userId={post.userId}
              firstName={''}
              lastName={''}
              title={post.title}
              content={post.content}
              image1={post.image1}
              image2={post.image2}
              likeCount={post.likeCount}
              commentList={post.comment || []}
              createdAt={post.createdAt}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfile;
