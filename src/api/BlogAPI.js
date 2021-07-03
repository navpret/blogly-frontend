import { useState, useEffect } from "react";
import axios from "../axios";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router";

const placeholderImages = [
  "https://www.freeimageslive.co.uk/files/images010/toy_brick_background.preview.jpg",
  "https://thumbs.dreamstime.com/z/wooden-textured-design-bright-colorful-wood-texture-artwork-double-shaded-background-wooden-textured-design-bright-colorful-wood-136050889.jpg",
  "https://st2.depositphotos.com/2727401/9268/v/950/depositphotos_92683430-stock-illustration-abstract-colorful-hand-sketched-swirls.jpg",
  "https://pixnio.com/free-images/2018/12/10/2018-12-10-18-20-13.jpg",
  "https://cdn.pixabay.com/photo/2017/05/26/21/02/colors-2347057_1280.png",
  "https://cdn.pixabay.com/photo/2013/11/04/19/02/umbrellas-205386_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_960_720.jpg",
];

const BlogAPI = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [sourceBlogs, setSourceBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshVar, setRefreshVar] = useState(false);

  useEffect(() => {
    (() => {
      axios
        .get("/blogs")
        .then((res) =>
          setSourceBlogs(
            _.orderBy(res.data, (blog) => blog.createdAt, ["desc"])
          )
        )
        .catch((err) => addToast(`${err}`, { appearance: "error" }));
    })();
  }, [addToast]);

  useEffect(() => {
    // setBlogs()

    setBlogs(
      sourceBlogs
        .filter(
          (blog) =>
            blog.title &&
            Object.values(blog).some(
              (val) =>
                val && val.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .map((blog) => ({
          ...blog,
          imgSrc: blog.content
            .split(" ")
            .filter(
              (item) =>
                item.includes("http") &&
                (item.includes("png") ||
                  item.includes("jpg") ||
                  item.includes("miro.medium") ||
                  item.includes("jpeg"))
            )[0]
            ? blog.content
                .split(" ")
                .filter(
                  (item) =>
                    item.includes("http") &&
                    (item.includes("png") ||
                      item.includes("jpg") ||
                      item.includes("miro.medium") ||
                      item.includes("jpeg"))
                )[0]
                .split('"')[1]
            : placeholderImages[
                Math.floor(Math.random() * placeholderImages.length)
              ],
        }))
    );
  }, [searchTerm, sourceBlogs, refreshVar]);

  const deleteBlog = (id) => {
    axios
      .delete(`/blogs/${id}`)
      .then((_) => {
        addToast("Successfully Deleted!", { appearance: "success" });
        history.push("/");
        setInterval(refreshBlogs, 1000);
      })
      .catch((err) => addToast(`${err}`, { appearance: "error" }));

    return true;
  };

  const editBlog = (id, details) => {
    axios
      .patch(`/blogs/${id}`, details)
      .then(addToast("Successfully Edited!", { appearance: "success" }))
      .catch((err) => addToast(`${err}`, { appearance: "error" }));

    return true;
  };

  const refreshBlogs = () => setRefreshVar(!refreshVar);

  return {
    blogs: [blogs, setBlogs],
    searchTerm: [searchTerm, setSearchTerm],
    refreshBlogs,
    deleteBlog,
    editBlog,
  };
};

export default BlogAPI;
