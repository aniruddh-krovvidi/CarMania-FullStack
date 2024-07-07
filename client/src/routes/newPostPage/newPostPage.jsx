import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          city: inputs.city,
          cylinders: parseInt(inputs.cylinders),
          horsepower: parseInt(inputs.horsepower),
          brand: inputs.brand,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          model:inputs.model,
          owner:inputs.owner,
          images: images,
          type: inputs.type,
          car: inputs.car,
        },
        postDetail: {
          desc: value,
          horsepower: inputs.horsepower,
          color: inputs.color,
          warranty: inputs.warranty,
          steering: inputs.steering,
          transmission: inputs.transmission,
          seller: inputs.seller,
          fuel: inputs.fuel,
        },
      });
      navigate("/"+res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Car</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="brand">Brand</label>
              <input id="brand" name="brand" type="text" />
            </div>
            <div className="item">
              <label htmlFor="cylinders">Cylinders</label>
              <input min={1} id="cylinders" name="cylinders" type="number" />
            </div>
            <div className="item">
              <label htmlFor="horsepower">Horsepower</label>
              <input min={1} id="horsepower" name="horsepower" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Car</label>
              <select name="car">
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="convertible">Convertible</option>
                <option value="msuv">Mid-size SUV</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="model">Model</label>
              <input id="model" name="model" type="text" />
            </div>
            <div className="item">
              <label htmlFor="owner">Owner</label>
              <input id="owner" name="owner" type="text" />
            </div>
            <div className="item">
              <label htmlFor="color">Color</label>
              <input id="color" name="color" type="text" />
            </div>
            <div className="item">
              <label htmlFor="warranty">Warranty</label>
              <input id="warranty" name="warranty" type="text" />
            </div>
            <div className="item">
              <label htmlFor="steering">Steering</label>
              <input id="steering" name="steering" type="text" />
            </div>
            <div className="item">
              <label htmlFor="transmission">Transmission</label>
              <input id="transmission" name="transmission" type="text" />
            </div>
            <div className="item">
              <label htmlFor="seller">Seller</label>
              <input id="seller" name="seller" type="text" />
            </div>
            <div className="item">
              <label htmlFor="fuel">Fuel</label>
              <input id="fuel" name="fuel" type="text" />
            </div>
            
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dvmrhn7td",
            uploadPreset: "carmania",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
