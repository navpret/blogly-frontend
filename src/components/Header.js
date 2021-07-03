import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";

const WrapperHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: min-content;
  background-color: black;
  color: white;
  padding: 20px 3vw;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .nav {
  }
  .navlink {
    padding: 10px 20px;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .navlink:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .active-header-link {
    background-color: rgba(255, 255, 255, 0.1);
  }
  nav .search-input {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .search-input {
    padding: 10px 20px;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 10px;
    display: inline-block;
  }
  .search-container{
    display: inline-block;
  }
`;

const Header = () => {
  const state = useContext(GlobalState);
  const [searchTerm, setSearchTerm] = state.blogAPI.searchTerm;

  return (
    <WrapperHeader>
      <Link className="logo" to="/">
        Blogly
      </Link>
      <nav className="nav">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            placeholder="Search for Blogs"
          />
        </div>
        <NavLink className="navlink" exact={true} activeClassName="active-header-link" to="/">
          Explore
        </NavLink>
        <NavLink className="navlink" exact={true} activeClassName="active-header-link" to="/new">
          Write
        </NavLink>
      </nav>
    </WrapperHeader>
  );
};

export default Header;
