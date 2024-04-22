import React, { useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

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
  
    const [loveStatus, setLoveStatus] = useState(false);
    const [commentStatus, setCommentStatus] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [sendButtonDisable, setSendButtonDisable] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(
      localStorage.getItem("psnUserId")
    );
    const [postId, setPostId] = useState(props.postId);
  
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
  
    function handleLoveClick(e) {
      console.log("Do nothing for now");
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
  
    function sendComment(e) {
    //   dispatch(
    //     addComment({
    //       postId: postId,
    //       newComment: {
    //         userId: localStorage.getItem("psnUserId"),
    //         userFullname:
    //           localStorage.getItem("psnUserFirstName") +
    //           " " +
    //           localStorage.getItem("psnUserLastName"),
    //         content: commentContent,
    //       },
    //     })
    //   );
      setCommentContent("");
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
            {/* Sub-function love button */}
            <div className="mx-3">
              <span
                className={`mx-1 fs-4`}
                onClick={handleLoveClick}
              >
                {loveStatus ? (
                  <RiHeartFill className="text-danger" />
                ) : (
                  <RiHeartLine className="text-danger" />
                )}
              </span>
              <span>
                {props.loveList > 0 ? props.loveList : null}
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
                {props.commentList.length > 0 ? props.commentList.length : null}
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
              {props.commentList.map((commentItem) => (
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