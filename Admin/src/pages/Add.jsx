import { MdCloudUpload } from "react-icons/md";
import React from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("laundry");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("Laundry Supplies");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("subCategory", subCategory);
      formData.append("bestsellers", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setBestseller("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flexx flex-col w-full items-start gap-5"
    >
      <div>
        {/* --------  UPLOADING  IMAGE ----------- */}
        <p className="mb-2 ">Upload image</p>
        <div className="flex gap-5 ">
          <label htmlFor="image1" className="cursor-pointer">
            {!image1 ? (
              <MdCloudUpload className="text-[80px] text-gray-400" />
            ) : (
              <img
                src={URL.createObjectURL(image1)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          <label htmlFor="image2" className="cursor-pointer">
            {!image2 ? (
              <MdCloudUpload className="text-[80px] text-gray-400" />
            ) : (
              <img
                src={URL.createObjectURL(image2)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3" className="cursor-pointer">
            {!image3 ? (
              <MdCloudUpload className="text-[80px] text-gray-400" />
            ) : (
              <img
                src={URL.createObjectURL(image3)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4" className="cursor-pointer">
            {!image4 ? (
              <MdCloudUpload className="text-[80px] text-gray-400" />
            ) : (
              <img
                src={URL.createObjectURL(image4)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/* -------- PRODUCT NAME ------------------ */}
      <div className="w-full ">
        <p className="mb-2">Product name</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      {/* -------PRODUCT DESCRIPTION---------- */}
      <div className="w-full ">
        <p className="mb-2">Product description</p>
        <textarea
          type="text"
          placeholder="Content here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-8">
        {/*-------------- PRODUCT CATEGORY---------- */}
        <div>
          <p className="mb-2 ">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            required
          >
            <option value="laundry">Laundry</option>
            <option value="cleaning">Cleaning</option>
            <option value="machines">Machines</option>
          </select>
        </div>

        {/* -------------- PRODUCT SUBCATEGORY ----------- */}
        <div>
          <p className="mb-2 "> SubCategory</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="Laundry Supplies">Laundry Supplies</option>
            <option value="Cleaning Agents"> Cleaning Agents</option>
            <option value="Tools & Equipment">Tools & Equipment</option>
          </select>
        </div>

        {/* -------------- PRODUCT PRICE ------------- */}
        <div>
          <p className="mb-2  ">Product Price</p>
          <input
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="123457890"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        {/* -------------- PRODUCT BESTSELLER ------------- */}
        <div className="flex items-center gap-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>
      </div>

      {/* -------------- SUBMIT BUTTON ------------- */}
      <button
        type="submit"
        className="cursor-pointer w-28 py-3 mt-4 bg-black text-white "
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
