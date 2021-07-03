import React, { useContext } from "react";
import styled from "styled-components";
import Loading from "../components/utils/Loading";
import { GlobalState } from "../GlobalState";
import Card from "../components/Card";

const Wrapper = styled.div`
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 0.25fr));
    grid-gap: 2rem;
    justify-content: start;
    margin: 30px 0;
  }
`;

const Home = () => {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;
  const [searchTerm] = state.blogAPI.searchTerm;

  if (blogs.length === 0) return <Loading />;

  return (
    <Wrapper>
      {searchTerm ? (
        <h1>
          Found {blogs.length} Result{blogs.length > 1 && "s"}
        </h1>
      ) : (
        <h1>Latest from Blogly</h1>
      )}
      <div className="blog-grid">
        {blogs.map((post) => (
          <Card post={post} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Home;
