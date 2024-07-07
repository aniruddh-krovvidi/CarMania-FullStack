import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
        <SearchBar />
        <h1 className="title">Discover Your Dream Car in Dubai</h1>
        <h4>Explore a comprehensive collection of new and pre-owned cars from trusted dealerships and private sellers.</h4>
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Brands</h2>
            </div>
            <div className="box">
              <h1>U.A.E</h1>
              <h2>Area of Focus</h2>
            </div>
            <div className="box">
              <h1>5000+</h1>
              <h2>Users</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/burj.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
