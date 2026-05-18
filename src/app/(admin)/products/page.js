"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Espresso", category: "Coffee", price: 3.50, stock: 120 },
    { id: 2, name: "Latte", category: "Coffee", price: 4.50, stock: 85 },
    { id: 3, name: "Croissant", category: "Pastry", price: 3.00, stock: 40 },
    { id: 4, name: "Green Tea", category: "Tea", price: 3.00, stock: 60 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "" });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: "", category: "", price: "", stock: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your coffee shop products inventory</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#1E3023] hover:bg-[#2a4231] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-sm font-medium">
              <th className="py-4 px-4">Product Name</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Stock</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 font-medium text-gray-800">{product.name}</td>
                <td className="py-4 px-4 text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">{product.category}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">${Number(product.price).toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-600">{product.stock}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-[#1E3023] hover:bg-gray-100 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20"
                  placeholder="e.g. Iced Caramel Macchiato"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20 bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Tea">Tea</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#1E3023] text-white font-medium hover:bg-[#2a4231] transition-colors">
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
