import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const Wrapper = styled.div`
  max-width: 290px;
  position: relative;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
  filter: drop-shadow(0px 3.50877px 38.5965px rgba(0, 0, 0, 0.1));

  .card:hover {
    transform: translateY(-5px);
    transition: all 100ms ease-in-out;
    box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.1);
  }
  .card img {
    height: 270px;
    background-position: center;
    object-fit: cover;
    width: 100%;
  }

  .card .else {
    background-color: white;
  }
  .card .part-2 {
    padding: 0 20px;
  }
  .card .part-2 h2 {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    margin: 8px 0;
  }
  .card .part-2 p {
    font-size: 0.8rem;
  }
  .card .part-3 {
    font-size: 0.8rem;
    padding: 10px 20px;
    background: black;
    color: white;
    height: max-height;
  }
  .card .part-3 h3 {
    color: #ccc;
    margin: 0;
  }
  .card .part-3 p {
    margin: 3px 0;
    font-size: 0.7rem;
    height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card .card-title {
    height: 2.8rem;
    ${"" /* white-space: nowrap; */}
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const Card = ({ post }) => {
  return (
    <Wrapper>
      <Link
        to={{ pathname: `/read/${post._id}`, state: { blog: post } }}
        className="card"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={post.imgSrc} alt="Preview" />
        </div>
        <div className="else">
          <div className="part-2">
            <h2 className="card-title">
              {post.title}
            </h2>
            <p>{`${post.postedBy}・${
              post.createdAt && moment(post.createdAt).fromNow()
            }`}</p>
          </div>
          <div className="part-3">
            <h3>Sneak Peak</h3>
            <p>{post.content.replace(/<(?:.|\n)*?>/gm, "")}</p>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Card;
