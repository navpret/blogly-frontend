import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import axios from "../axios";
import moment from "moment";
import Dante from "dante3";
import NotFound from "../components/utils/NotFound";
import styled from "styled-components";
import { GlobalState } from "../GlobalState";
import { useToasts } from "react-toast-notifications";

const Wrapper = styled.div`
  max-width: 700px;
  width: 90%;
  margin: auto;

  .styled-input {
    border: none;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.8);
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
    max-width: 80%;
  }
  .writer {
    text-decoration: underline;
  }
  .sub-text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .sub-text-container button {
    display: inline-block;
    border: none;
    border-radius: 50%;
    padding: 10px;
    margin-right: 10px;
    font-size: 1.2rem;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .sub-text-container button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .heading-container {
    display: inline-block;
    flex: 1;
  }
`;

const Blog = (props) => {
  const { addToast } = useToasts();
  const params = useParams();
  const history = useHistory();
  const [blogInfo, setBlogInfo] = useState({});
  const [editBlogInfo, setEditBlogInfo] = useState({});
  const setEditBlogContent = useState("")[1];
  const [isShowingEditor, setIsShowingEditor] = useState(false);
  const state = useContext(GlobalState);
  const { deleteBlog } = state.blogAPI;

  useEffect(() => {
    const fetchBlogInfo = () => {
      axios
        .get(`/blogs/${params.id}`)
        .then((res) => {
          console.table("data", res.data);
          setBlogInfo(res.data);
          setEditBlogInfo(res.data);
        })
        .catch((err) => addToast(`${err}`, { appearance: "error" }));
    };

    if (props?.location?.state?.blog) {
      setBlogInfo(props.location.state.blog);
      setEditBlogInfo(props.location.state.blog);
    } else {
      fetchBlogInfo();
    }
  }, [props, params.id, addToast]);

  if (!blogInfo || !blogInfo.title) return <NotFound />;

  return (
    <div className="" style={{ position: "relative" }}>
      {isShowingEditor && (
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "black",
            color: "white",
            fontSize: "2rem",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("Edited");
            if (
              Object.values(editBlogInfo)
                .map((obj) => {
                  console.log(obj);
                  return String(obj).replace(/<(?:.|\n)*?>/gm, "").length <= 0;
                })
                .some((val) => val === true)
            )
              return addToast("Please fill out all fields", {
                appearance: "warning",
              });

            axios
              .patch(`/blogs/${editBlogInfo._id}`, { ...editBlogInfo })
              .then((res) => {
                addToast("Edited Successfully", { appearance: "success" });
                window.location.reload();
                res?.data?._id && history.push(`/read/${res.data._id}`);
              })
              .catch((err) => addToast(`${err}`, { appearance: "error" }));
          }}
        >
          <FiCheck atyle={{ marginTop: "10px" }} />
        </button>
      )}
      <Wrapper>
        {isShowingEditor ? (
          <input
            className="styled-input title-input"
            value={editBlogInfo.title}
            onChange={(e) => {
              setEditBlogInfo({ ...editBlogInfo, title: e.target.value });
            }}
          />
        ) : (
          <h1 className="styled-input title-input">{blogInfo.title}</h1>
        )}
        <div className="sub-text-container">
          <div className="heading-container">
            <h4 className="styled-input name-input">
              By{" "}
              {isShowingEditor ? (
                <input
                  className="writer"
                  style={{
                    border: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.8) !important",
                    fontSize: "1.4rem",
                    display: "inline-block",
                    width: "200px",
                    textDecoration: "none",
                  }}
                  type="text"
                  value={editBlogInfo.postedBy}
                  onChange={(e) =>
                    setEditBlogInfo({
                      ...editBlogInfo,
                      postedBy: e.target.value,
                    })
                  }
                />
              ) : (
                <Link
                  className="writer"
                  onClick={() => {
                    history.push("/");
                    state.blogAPI.searchTerm[1](blogInfo.postedBy);
                  }}
                >
                  {blogInfo.postedBy}
                </Link>
              )}{" "}
              •{" "}
              {blogInfo &&
                blogInfo.createdAt &&
                moment(blogInfo.createdAt).format("DD-MM-YYYY")}
            </h4>
          </div>
          <div className="button-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteBlog(blogInfo._id);
              }}
            >
              <FiTrash2 />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsShowingEditor(!isShowingEditor);
              }}
            >
              <FiEdit />
            </button>
          </div>
        </div>
        {blogInfo.content.length > 0 &&
          (isShowingEditor ? (
            (() => (
              <Dante
                content={blogInfo.content}
                readOnly={false}
                onUpdate={(editor) => setEditBlogContent(editor.getHTML())}
              />
            ))()
          ) : (
            <>
              <Dante readOnly={true} content={blogInfo.content}></Dante>
            </>
          ))}
      </Wrapper>
    </div>
  );
};

export default Blog;
