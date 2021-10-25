import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import CommentService from "../../../../services/CommentService";
import RequestCommentService from "../../../../services/RequestCommentService"
import userService from "../../../../services/UserService";
// import tasksValidations from "../../../../../validations/tasks-validations";
import "./RequestComments.scss";
// import SOCKET from "../../../../../socket/socket"

const RequestComments = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const loggedInUser = userService.userLoggedInInfo();

  useEffect(() => {
    getProjectComments(props.requestId);
  }, [props.requestId]);

  const getProjectComments = (id) => {
    RequestCommentService.getCommentByRequestId(id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        RequestCommentService.handleError();
      });
  };

  const newComment = () => {
    RequestCommentService.addRequestComment({
      data: comment,
      request: props.requestId,
      user: loggedInUser._id,
    })
      .then((res) => {
        RequestCommentService.handleMessage("add");
      })
      .catch((err) => {
        console.log("comments error", err);
        RequestCommentService.handleError();
      });
  };

  return (
    <div class="card comments">
      <div class="card-body">
        {comments.map((item, index) => {
          return (
            // <blockquote class="blockquote mb-0 comment-whole">
            <div className="d-flex align-items-start">
              <img
                width="40px"
                src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg"
              />
              <div className="comment-section">
                <span className="comment-name">{item.user.name}</span>
                <p className="comment">{item.data}</p>
              </div>
            </div>
            // </blockquote>
          );
        })}
      </div>
      <div class="card-footer">
        <div className="input-box d-flex align-items-center">
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <i onClick={newComment} className="mdi mdi-send" />
        </div>
      </div>
    </div>
  );
};

export default RequestComments;
