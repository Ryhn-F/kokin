"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Coffee,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Coffee",
    price: "",
    stock: "",
    description: "",
    image_url: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/product");
      setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Coffee",
      price: "",
      stock: "",
      description: "",
      image_url: "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      stock: prod.stock,
      description: prod.description || "",
      image_url: prod.image_url || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/product/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const payload = {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          description: formData.description,
          image_url: formData.image_url,
        };
        await axios.put(`http://localhost:3000/product/${editingId}`, payload);
      } else {
        const createData = new FormData();
        createData.append("name", formData.name);
        createData.append("category", formData.category);
        createData.append("price", Number(formData.price));
        createData.append("stock", Number(formData.stock));
        createData.append("description", formData.description);
        if (imageFile) {
          createData.append("image", imageFile);
        }

        const token = localStorage.getItem("token") || ""; // Optional token handling if needed
        await axios.post(
          "http://localhost:3000/product/create-product",
          createData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          },
        );
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(p);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-[2rem] shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="font-display text-3xl text-on-surface">Products</h2>
          <p className="font-body-md text-on-surface-variant mt-1">
            Manage your menu items
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button
            onClick={openAdd}
            className="rounded-full bg-primary text-on-primary px-6 h-[46px] shadow-sm hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
          >
            <Plus size={18} className="mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-[2rem] shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-outline-variant/30 text-on-surface-variant font-label-lg">
                <th className="px-6 py-5 whitespace-nowrap">Product</th>
                <th className="px-6 py-5 whitespace-nowrap">Category</th>
                <th className="px-6 py-5 whitespace-nowrap">Price</th>
                <th className="px-6 py-5 whitespace-nowrap">Stock</th>
                <th className="px-6 py-5 whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20 mx-auto"></div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-on-surface-variant font-body-lg"
                  >
                    No products found. Add one to get started.
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr
                    key={prod.id}
                    className="border-b border-outline-variant/20 hover:bg-surface-variant/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0 relative border border-outline-variant/30">
                          {prod.image_url ? (
                            <Image
                              src={prod.image_url}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Coffee
                              size={24}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-surface-variant/50"
                            />
                          )}
                        </div>
                        <span className="font-headline-sm text-on-surface">
                          {prod.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">
                      <span className="px-3 py-1 bg-surface-container rounded-lg border border-outline-variant/30 text-xs font-label-md">
                        {prod.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-on-surface">
                      {formatPrice(prod.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-label-md px-2 py-1 rounded-md ${prod.stock < 10 ? "bg-red-50 text-red-700" : "text-emerald-700 bg-emerald-50"}`}
                      >
                        {prod.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(prod)}
                          className="p-2 bg-surface-container hover:bg-primary-container hover:text-primary rounded-lg transition-colors text-on-surface-variant"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-2 bg-surface-container hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors text-on-surface-variant"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-[2rem] w-full max-w-2xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:bg-surface-variant p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-2xl text-on-surface mb-6">
              {editingId ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    Product Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="e.g. Latte"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    Category
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Non-Coffee">Non-Coffee</option>
                    <option value="Pastry">Pastry</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    Price (IDR)
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="25000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    Initial Stock
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="100"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    {editingId ? "Image URL" : "Product Image"}
                  </label>
                  {editingId ? (
                    <input
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="https://..."
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-label-lg file:bg-primary-container file:text-primary hover:file:bg-primary-container/80 transition-all cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-label-md text-on-surface-variant ml-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    placeholder="Product details..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/30">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="ghost"
                  className="rounded-full px-6 py-6 font-label-lg hover:bg-surface-variant"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-full bg-primary text-on-primary px-8 py-6 shadow-md hover:-translate-y-0.5 transition-transform font-label-lg"
                >
                  {editingId ? "Save Changes" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
