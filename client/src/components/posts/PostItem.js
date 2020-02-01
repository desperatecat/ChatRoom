import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import moment from "moment";
import { addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      //check if user has liked it or not
      return true;
    } else {
      return false;
    }
  }

  render() {
    let date = new Date().getDate();

    const { post, auth, showActions } = this.props; //post is passed from PostFeed

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>

          <div className="col-md-10 ">
            {post.user === auth.user.id ? (
              <div className="col-sm-6 bg-success rounded text-white">
                <p className="lead">{post.text}</p>
              </div>
            ) : (
              <div className="col-sm-6 boarder border-primary rounded">
                <p className="lead">{post.text}</p>
              </div>
            )}
            <div className="col-sm-8 ">
              {moment(post.date).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <br />

            {showActions ? (
              <div className="col-sm-8 ">
                <span>
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />

                    {post.likes.length > 1 ? (
                      <span className="badge badge-light">
                        {post.likes.length} Likes
                      </span>
                    ) : (
                      <span className="badge badge-light">
                        {post.likes.length} Like
                      </span>
                    )}
                  </button>

                  <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true //this is set to false on Post component if post exists
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
