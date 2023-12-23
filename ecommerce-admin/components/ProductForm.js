import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const response = await axios.post("/api/upload", data);
      setImages((prevImages) => [...prevImages, ...response.data.links]);
      setIsUploading(false);
    }
  }
  function sortImages(images) {
    setImages(images);
    console.log(images);
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Add product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Product Images</label>
      <div className="my-2 flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          setList={sortImages}
          list={images}
        >
          {!!images.length &&
            images.map((link) => {
              return (
                <div key={link} className="h-24 rounded-md overflow-hidden">
                  <img src={link} />
                </div>
              );
            })}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 p-2 border rounded-md flex items-center">
            <Spinner />
          </div>
        )}
        <label
          className="cursor-pointer border w-24 h-24 flex flex-col justify-center
         items-center text-gray-600 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          upload
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>Product Description</label>
      <textarea
        placeholder="product description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price (in USD)_</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button className="btn-primary">Save</button>
    </form>
  );
}
