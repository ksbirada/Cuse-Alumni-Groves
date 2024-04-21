import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

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
          <form className="w-100">
            <input 
              type="search" 
              className="form-control" 
              placeholder="Search user accounts..." 
            />
          </form>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-md-0">
            <Container className={styles.navbarContainer}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles.navContainer}>
                  <Nav.Link as={Link} to="/" className="text-decoration-none">
                    <li className={`list-group-item fs-5 py-3 shadow ${styles.textcolor}`}>
                      <RiNewspaperLine /> Newsfeed
                    </li>
                  </Nav.Link>
                  <Nav.Link as={Link} to="myprofile" className="text-decoration-none">
                    <li className={`list-group-item fs-5 py-3 shadow ${styles.textcolor}`}>
                      <RiFolderUserLine /> My Posts
                    </li>
                  </Nav.Link>
                  <Nav.Link as={Link} to="signout" className="text-decoration-none">
                    <li className={`list-group-item fs-5 py-3 shadow ${styles.signOutButton} ${styles.textcolor}`}>
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
            <PostItem
              key={123}
              postId={1}
              userId={22}
              firstName={"Kamaljit"}
              lastName={"Aulakh"}
              content={"This is my content"}
              image={"ABC"}
              loveList={[1,2,3]}
              shareList={[1,2,3]}
              commentList={[1,2,3]}
              postDate={"12:31:76"}/>
          </Col>
        </Row>
      </Container>
      
    </>
    
  );
}

export default NewsFeed;
