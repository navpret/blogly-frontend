import React, { useState, useContext } from "react";
import Dante from "dante3";
import styled from "styled-components";
import axios from "../axios";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../GlobalState";

const Wrapper = styled.form`
  margin: 70px auto;
  width: 50%;
  max-width: 700px;

  .styled-input {
    border: none;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.8);
    ${"" /* border-bottom: 2px solid rgba(0, 0, 0, 0.2); */}
    outline: none;
    margin: 10px 0;
  }
  .title-input {
    font-size: 4em;
    width: 100%;
    font-weight: bold;
    outline: none;
  }
  .name-input {
    max-width: 60%;
  }
  .btn-cta {
    display: block;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    font-size: 20px;
    float: right;
    clear: none;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
  .btn-cta:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Compose = ({ navigation }) => {
  // Seperated because of Danté's poor management
  const state = useContext(GlobalState);
  const { addToast } = useToasts();
  const [title, setTitle] = useState("");
  const history = useHistory();
  const [postAs, setPostAs] = useState("");
  const [content, setContent] = useState("");
  const { refreshBlogs } = state.blogAPI;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toSend = { title, content, postedBy: postAs };
    if (
      Object.values(toSend)
        .map((obj) => obj.replace(/<(?:.|\n)*?>/gm, "").length <= 0)
        .some((val) => val === true)
    )
      return addToast("Please fill out all fields", { appearance: "warning" });

    axios
      .post("/blogs", { ...toSend })
      .then((res) => {
        addToast("Posted Successfully", { appearance: "success" });
        refreshBlogs();
        history.push(`/read/${res.data._id}`);
      })
      .catch((err) => addToast(`${err}`, { appearance: "error" }));
  };


  return (
    <Wrapper onSubmit={handleSubmit}>
      <input
        className="title-input styled-input"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Enter a title"
        maxLength="100"
      />
      <input
        className="styled-input name-input"
        onChange={(e) => setPostAs(e.target.value)}
        value={postAs}
        placeholder="Write the blog as..."
        maxLength="100"
      />
      <Dante
        onUpdate={(editor) => setContent(editor.getHTML())}
        content={content}
        placeholder="content"
        className="dante"
      />
      {/* <input
        onChange={(e) => setContent(e.target.value)}
        content={content}
        placeholder="content"
        className="title"
      /> */}
      {/* {JSON.stringify(form)} */}
      <div className="">
        <button
          className="btn-cta"
          type="submit"
          style={{
            display: "flex",
            align: "center",
            justifyContent: "space-between",
          }}
        >
          Post it
          <IoArrowForwardOutline
            style={{ lineHeight: "20px", marginTop: "3px", marginLeft: "10px" }}
          />
        </button>
      </div>
    </Wrapper>
  );
};

export default Compose;
