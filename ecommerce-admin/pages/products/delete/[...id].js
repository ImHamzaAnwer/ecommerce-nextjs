import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
  function goBack() {
    router.push("/products");
  }

  return (
    <Layout>
      <h1 className="text-center">
        Are you sure you want to delete "{productData?.title}" ?
      </h1>
      <div className="flex gap-1 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </Layout>
  );
}
