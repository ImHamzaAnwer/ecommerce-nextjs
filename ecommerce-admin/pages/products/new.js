import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <Layout>
      <h1>Add New Product</h1>

      <form onSubmit={createProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Add product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
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
    </Layout>
  );
}
