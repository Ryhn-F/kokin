"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Edit, Trash2, X, Armchair, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    seat_number: "",
    capacity: 2,
    status: "available",
  });

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/seat");
      setSeats(Array.isArray(res.data) ? res.data : (res.data.data || []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData({ seat_number: "", capacity: 2, status: "available" });
    setIsModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setFormData({
      seat_number: s.seat_number,
      capacity: s.capacity,
      status: s.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this seat?")) {
      try {
        await axios.delete(`http://localhost:3000/seat/${id}`);
        fetchSeats();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        seat_number: String(formData.seat_number),
        capacity: Number(formData.capacity),
        status: formData.status,
      };

      if (editingId) {
        await axios.put(`http://localhost:3000/seat/${editingId}`, payload);
      } else {
        await axios.post("http://localhost:3000/seat", payload);
      }
      setIsModalOpen(false);
      fetchSeats();
    } catch (err) {
      console.error(err);
      alert("Failed to save seat");
    }
  };

  const getStatusStyle = (st) => {
    if (st === "available")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (st === "reserved")
      return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-[2rem] shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="font-display text-3xl text-on-surface">
            Table Management
          </h2>
          <p className="font-body-md text-on-surface-variant mt-1">
            Manage seats and capacities
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            onClick={openAdd}
            className="rounded-full bg-primary text-on-primary px-6 h-[46px] shadow-sm hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
          >
            <Plus size={18} className="mr-2" /> Add Seat
          </Button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-surface-variant/20 animate-pulse rounded-3xl"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className="bg-surface rounded-3xl p-5 shadow-sm border border-outline-variant/30 flex flex-col items-center text-center hover:shadow-md hover:border-primary/40 transition-all group relative overflow-hidden"
            >
              <span
                className={`absolute top-0 inset-x-0 h-1.5 ${seat.status === "available" ? "bg-emerald-400" : seat.status === "reserved" ? "bg-orange-400" : "bg-red-400"}`}
              ></span>

              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4 mt-2 group-hover:bg-primary-container group-hover:text-primary transition-colors">
                <Armchair size={28} />
              </div>

              <h3 className="font-display text-3xl text-on-surface mb-1">
                {seat.seat_number}
              </h3>
              <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-label-md mb-4 bg-surface-container px-3 py-1 rounded-full">
                <Users size={14} /> {seat.capacity} Seats
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-label-md border w-full capitalize mb-4 ${getStatusStyle(seat.status)}`}
              >
                {seat.status}
              </span>

              <div className="flex w-full gap-2 mt-auto border-t border-outline-variant/20 pt-4">
                <button
                  onClick={() => openEdit(seat)}
                  className="flex-1 p-2 rounded-xl bg-surface-container hover:bg-primary-container text-on-surface-variant hover:text-primary transition-colors flex justify-center items-center"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(seat.id)}
                  className="flex-1 p-2 rounded-xl bg-surface-container hover:bg-red-100 text-on-surface-variant hover:text-red-600 transition-colors flex justify-center items-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-[2rem] w-[50%] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:bg-surface-variant p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-2xl text-on-surface mb-6">
              {editingId ? "Edit Seat" : "Add New Seat"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant ml-1">
                  Seat Number / Name
                </label>
                <input
                  required
                  value={formData.seat_number}
                  onChange={(e) =>
                    setFormData({ ...formData, seat_number: e.target.value })
                  }
                  className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. A1, T5"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant ml-1">
                  Capacity
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant ml-1">
                  Status
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full bg-surface-container px-5 py-3.5 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/30">
                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary text-on-primary py-6 shadow-md hover:-translate-y-0.5 transition-transform font-label-lg"
                >
                  {editingId ? "Save Changes" : "Create Seat"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
