import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Nav, Navbar, Row, Form, Alert } from 'react-bootstrap';
import logo from './assets/ca.jpeg';
import PostItem from "./PostItem";

import {
  RiNewspaperLine,
  RiFolderUserLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';

import styles from './styles/NewsFeed.module.css';

function NewsFeed() {

  const navigate = useNavigate();

  // const [postId, setPostId] = useState('');
  // const [userId, setUserId] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [image1, setImage1] = useState('');
  // const [image2, setImage2] = useState('');
  // const [likeCount, setLikeCount] = useState('');
  // const [comments, setComments] = useState([]);
  // const [createdAt, setCreatedAt] = useState('');
  const[responsePost, setResponsePost] = useState([]);
  const[error, setError] = useState('');
  const[images, setImages] = useState([]);
  const[posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/getpost');
        const data = await response.json();
        if (data.status === 'success') {
          setResponsePost(data.payload);
        } else {
          console.error('Error fetching posts:', data.message);
        }
        console.log(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  function handleSearch(e) {
    navigate("/newsfeed/allaccounts");
  }

  function handleSignOut(e) {
    e.preventDefault();
    console.log(localStorage);
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/login");
  }


  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 2); // Limit to 2 images
    const filesSizeValid = selectedFiles.every(file => file.size <= 20 * 1024 * 1024); // 20 MB limit

    if (!filesSizeValid) {
      setError('One or more images exceed the 20 MB size limit.');
      return;
    }

    setImages(selectedFiles);
    setError('');
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (!title || !content) {
      setError('Please enter both title and content for your post.');
      return;
    }
    if (content.length > 1000) {
      setError('Content is too long. Maximum length is 1000 characters.');
      return;
    }
    
    const newPost = {
      id: posts.length,
      title,
      content,
      images,
    };
    
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setImages([]);
    setError('');
  };

  return (
    <>
      <Container className="pt-3">
      <Row className="mb-3">
        <Col md={6}>
          <Row className="justify-content-center align-items-center">
            <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="Cuse Alumni Groves logo" />
            </Col>
            <Col className="text-sm-start text-center">
              <h3>Cuse Alumni Groves</h3>
            </Col>
          </Row>
        </Col>
        <Col md={6} className={styles.searchBar}>
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Button variant="success" onClick={handleSearch}>
              Find All User Accounts
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-md-0">
            <Container className={styles.navbarContainer}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles.navContainer}>
                  <Nav.Link as={Link} to="/MyProfile" className="text-decoration-none">
                    <li className={`list-group-item fs-5 py-3 shadow ${styles.textcolor}`}>
                      <RiFolderUserLine /> My Profile
                    </li>
                  </Nav.Link>
                  <Nav.Link as={Link} to="signout" className="text-decoration-none">
                    <li className={`list-group-item fs-5 py-3 shadow ${styles.signOutButton} ${styles.textcolor}`} onClick={handleSignOut}>
                      <RiLogoutBoxLine /> Sign Out
                    </li>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col md={8}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlePostSubmit} className={styles.postContentForm}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter post title"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                onChange={handleContentChange}
                placeholder="What's happening?"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Images (up to 2)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </Form.Group>
            <Button type="submit" variant="primary">Post</Button>
          </Form>
          {posts.map((post, index) => (
            <div key={index} className="mb-3">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              {post.images.map((image, idx) => (
                <img 
                  key={idx} 
                  src={URL.createObjectURL(image)} 
                  alt={`Post ${idx}`} 
                  style={{ maxWidth: '100%', height: 'auto' }} 
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>
      </Container>
      <Container>
        <Row className='mt-5 mb-5'>
          <Col md={4}></Col>
          <Col md={8}>

          {responsePost.length > 0 ? (
              responsePost.map((post, index) => (
                <PostItem
                  key={post.id}
                  postId={post.id}
                  userId={post.userId}
                  firstName={post.firstName || ''}
                  lastName={post.lastName || ''}
                  title={post.title}
                  content={post.content}
                  image1={post.image1}
                  image2={post.image2}
                  likeCount={post.likeCount}
                  like={post.like}
                  commentList={post.comment || []}
                  createdAt={post.createdAt}
                />
              ))
          ) : (
            <div>No posts found.</div>
          )}
          </Col>
        </Row>
      </Container>
      
    </>
    
  );
}

export default NewsFeed;
