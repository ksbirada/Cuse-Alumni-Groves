import React, { useState ,useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import axios from "axios";

import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiShareForwardFill,
  RiSendPlane2Fill,
} from "react-icons/ri";
import { Button, Col, Form, Row } from "react-bootstrap";


function PostItem(props) {
    //const dispatch = useDispatch();
    const [refreshComponent, setRefreshComponent] = useState(false);
    
    const [commentStatus, setCommentStatus] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [sendButtonDisable, setSendButtonDisable] = useState(true);
    const [postId, setPostId] = useState(props.postId);
    const [commentList, setCommentList] = useState(props.commentList);
    const [currentUserId, setCurrentUserId] = useState(
      localStorage.getItem("userId")
    ); 
    const [likeStatus, setLikeStatus] = useState(false);

    useEffect(() => {
      if (props.like.includes(currentUserId)) {
        setLikeStatus(true);
      }
    }, []);
  
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");

  
    function handleLikeClick(e) {
      const userId=localStorage.getItem("userId");
      console.log(props)
      console.log(currentUserId)
      if (!props.like.includes(currentUserId)) {
        setLikeStatus(true);    
      } else {
        setLikeStatus(false);
      }
      updateLike(postId, userId);
    }

    async function updateLike(postId, userId) {
      const response = await axios({
          method: "post",
          url: "http://localhost:8080/api/v1/likepost",
          data: {
              id1: postId,
              id2: userId
          }
      });
      
      return response.data;
  }
  
    function handleShareClick(e) {
      //dispatch(addShare({ postId: postId, userId: currentUserId }));
      //dispatch(getFollowingPosts());
    }
  
    function handleCommentButtonClick(e) {
      setCommentStatus(!commentStatus);
    }
  
    function handleCommentContentChange(e) {
      e.preventDefault();
  
      setCommentContent(e.target.value);
  
      if (commentContent.length - 1 > 0 && commentContent.length - 1 <= 100) {
        setSendButtonDisable(false);
      } else {
        setSendButtonDisable(true);
      }
    }
  
    async function sendComment(e) {
    try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/insertcomment",
      data: {
        commentModel: {
          userId: localStorage.getItem("userId"),
          userFullname: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
          content: commentContent, 
        },
        postId: {
          id: postId,
        },
      },
    });
    if (response.status >= 200 && response.status < 300) {
      const newComment = {
        username: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
        comment: commentContent,
      };
      setCommentContent("");
      setRefreshComponent(prevState => !prevState);

      // Update the comment list by adding the new comment
      setCommentList(commentList => [...commentList, newComment]);
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
    }
  
    return (
      <div className="border shadow rounded-3 border-primary p-3 mt-3">
        <Row>
          <div className="d-flex align-items-center mb-3">
            <div className="d-flex flex-column">
            <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
            {/* <div className="text-secondary">{timeAgo.format(new Date(props.postDate).getTime())}</div> */}
            </div>
          </div>
          <div className="mx-3">
            <div>
              <p>{props.title}</p>
            </div>
            <div>
              <p>{props.content}</p>
            </div>
            {props.image1 !== null ? (
              <div className="d-flex justify-content-center align-items-center mb-3">
                <img src={props.image1} alt="" />
              </div>
            ) : (
              <span></span>
            )}
            {props.image2 !== null ? (
              <div className="d-flex justify-content-center align-items-center mb-3">
                <img src={props.image2} alt="" />
              </div>
            ) : (
              <span></span>
            )}
          </div>
  
          {/* Sub-functions of a post */}
  
          <div className="d-flex justify-content-center align-items-center">
            {/* Sub-function like button */}
            <div className="mx-3">
              <span
                className={`mx-1 fs-4`}
                onClick={handleLikeClick}
              >
                {likeStatus ? (
                  <RiHeartFill className="text-danger" />
                ) : (
                  <RiHeartLine className="text-danger" />
                )}
              </span>
              <span>
                {props.like && props.like > 0 ? props.like : null}
              </span>
            </div>
  
            {/* Sub-function comment button */}
            <div className="mx-3">
              <span
                className={`mx-1 fs-4`}
                onClick={handleCommentButtonClick}
              >
                <RiMessage2Fill className="text-primary" />
              </span>
              <span>
                {commentList.length > 0 ? commentList.length : null}
              </span>
            </div>
          </div>
  
          {/* List of comments and comment input box */}
          {commentStatus === true ? (
            <div className="mt-3">
              <div className="d-flex align-items-center">
                <Form className="w-100 mx-1">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Write a comment..."
                      value={commentContent}
                      onChange={handleCommentContentChange}
                    />
                  </Form.Group>
                </Form>
                <span className="mx-1">{commentContent.length}/100</span>
                <div className="ms-auto">
                  <Button
                    variant="success"
                    className="p-1"
                    disabled={sendButtonDisable}
                    onClick={sendComment}
                  >
                    <RiSendPlane2Fill className="fs-4" />
                  </Button>
                </div>
              </div>
              {commentList.map((commentItem) => (
                <div className="border rounded border-info my-3 px-2 pb-2">
                  <div className="d-flex align-items-center my-2">
                    <div className="w-100 mx-1 fw-bold">
                      <span>{commentItem.username}</span>
                    </div>
                  </div>
                  <div>{commentItem.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <span></span>
          )}
        </Row>
      </div>
    );
  }

  export default PostItem;