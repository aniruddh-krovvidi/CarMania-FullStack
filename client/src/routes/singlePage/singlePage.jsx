import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import './singlePage.scss';
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const [inCart, setInCart] = useState(false); // Track if post is in cart
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if post is already in cart on component mount
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const postExists = cart.some(item => item.id === post.id);
    setInCart(postExists);
  }, [post.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved(prev => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved(prev => !prev);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const postExists = cart.some(item => item.id === post.id);

    if (!postExists) {
      cart.push(post);
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true); // Update state to reflect item in cart
    } else {
      // Remove item from cart
      const updatedCart = cart.filter(item => item.id !== post.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(false); // Update state to reflect item removed from cart
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="city">
                  <img src="/pin.png" alt="" style={{ width: "20px", height: "20px" }} />
                  <span> {post.city}</span>
                </div>
                <div className="price">AED {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/owner.png" alt="" />
              <div className="featureText">
                <span>Owner </span>
                {post.owner}
              </div>
            </div>
            <div className="feature">
              <img src="/warranty.png" alt="" />
              <div className="featureText">
                <span>Warranty </span>
                {post.postDetail.warranty}
              </div>
            </div>
            <div className="feature">
              <img src="/steering.png" alt="" />
              <div className="featureText">
                <span>Steering </span>
                <p>{post.postDetail.steering}</p>
              </div>
            </div>
          </div>
          <p className="title">Specs</p>
          <div className="sizes">
            <div className="size">
              <img src="/color.png" alt="" />
              <span>{post.postDetail.color}</span>
            </div>
            <div className="size">
              <img src="/horsepower.png" alt="" />
              <span>{post.postDetail.horsepower}HP</span>
            </div>
            <div className="size">
              <img src="/fuel.png" alt="" />
              <span>{post.postDetail.fuel}</span>
            </div>
          </div>
          <p className="title">Additional Info</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/transmission.png" alt="" />
              <div className="featureText">
                <span>Transmission</span>
                <p>{post.postDetail.transmission}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/brand.png" alt="" />
              <div className="featureText">
                <span>Brand</span>
                <p>{post.brand}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Seller</span>
                <p>{post.postDetail.seller}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleAddToCart}>
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
