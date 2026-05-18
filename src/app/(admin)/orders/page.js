"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Clock,
  CheckCircle2,
  Filter,
  Trash2,
  Edit,
  X,
  Phone,
  Users,
  MapPin,
  Coffee,
  Armchair,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order`);
      setOrders(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order/${id}`);
        fetchOrders();
      } catch (error) {
        console.error(error);
        alert("Failed to delete order");
      }
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order/${editingOrder.id}`, {
        status: editStatus,
      });
      setIsEditModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const openEdit = (order) => {
    setEditingOrder(order);
    setEditStatus(order.status || "Pending");
    setIsEditModalOpen(true);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-[2rem] shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="font-display text-3xl text-on-surface">
            Order Management
          </h2>
          <p className="font-body-md text-on-surface-variant mt-1">
            Manage incoming orders and reservations
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
              placeholder="Search orders..."
              className="w-full sm:w-64 pl-12 pr-4 py-3 bg-surface-container border border-outline-variant/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-label-md"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full px-4 h-[46px] border-outline-variant/50 hover:bg-surface-variant"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-surface-variant/20 animate-pulse rounded-[2rem]"
            ></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-surface rounded-[2.5rem] p-16 text-center shadow-sm border border-outline-variant/30 flex flex-col items-center">
          <Coffee
            size={48}
            className="text-on-surface-variant opacity-50 mb-4"
          />
          <p className="font-headline-md text-on-surface">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface rounded-[2rem] p-6 shadow-sm border border-outline-variant/30 flex flex-col hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-5 pb-4 border-b border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                    Order #{order.id}
                  </span>
                  <h3 className="font-headline-md text-on-surface flex items-center gap-2">
                    {order.person_name || "Guest"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-on-surface-variant font-body-sm">
                    <Phone size={14} /> {order.no_telp || "-"}
                  </div>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-label-md border shadow-sm capitalize ${getStatusStyle(order.status)}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-4 mb-6">
                {/* Products */}
                {(order.order_items?.length > 0 || order.OrderItems?.length > 0) && (
                  <div>
                    <h4 className="font-label-sm text-on-surface-variant mb-2 flex items-center gap-2">
                      <Coffee size={14} /> Items
                    </h4>
                    <ul className="space-y-2">
                      {(order.order_items || order.OrderItems).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center text-sm font-body-md text-on-surface bg-surface-container rounded-xl p-2 px-3 border border-outline-variant/20"
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-label-lg text-primary">
                              {item.quantity}x
                            </span>
                            {item.products?.name || item.Product?.name || "Product"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reservation Info */}
                {order.seat_id && (
                  <div className="bg-primary-container/30 rounded-xl p-3 border border-primary/20">
                    <h4 className="font-label-sm text-primary mb-2 flex items-center gap-2">
                      <Armchair size={14} /> Reservation
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-body-md text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <Users size={12} /> {order.guest_count} Guests
                      </div>
                      <div className="flex items-center gap-1 text-right justify-end">
                        Seat #{order.seats?.seat_number || order.Seat?.seat_number || order.seat_id}
                      </div>
                      <div className="col-span-2 flex items-center gap-1 mt-1 text-on-surface font-label-md">
                        <Clock size={12} className="text-primary" />{" "}
                        {order.reservation_date} • {order.reservation_time} -{" "}
                        {order.reservation_end_time}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-outline-variant/20 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                  <span className="font-label-lg text-on-surface-variant">
                    Total
                  </span>
                  <span className="font-display text-2xl text-on-surface text-right">
                    {formatPrice(
                      order.total_price || (order.order_items || order.OrderItems)?.reduce(
                        (acc, i) => acc + (i.price || i.products?.price || i.Product?.price || 0) * i.quantity,
                        0,
                      ) || 0,
                    )}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => openEdit(order)}
                    className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface border border-outline-variant/40 rounded-xl h-11 font-label-md transition-colors shadow-none"
                  >
                    <Edit size={16} className="mr-2" /> Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(order.id)}
                    variant="ghost"
                    className="w-11 h-11 p-0 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-[2rem] w-[50%] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:bg-surface-variant p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-2xl text-on-surface mb-6">
              Update Order Status
            </h3>
            <form onSubmit={handleUpdateStatus} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full appearance-none bg-surface-container px-5 py-4 rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body-lg text-on-surface cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">paid</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  variant="outline"
                  className="flex-1 rounded-full h-12 font-label-lg border-outline-variant/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-primary text-on-primary shadow-md h-12 font-label-lg hover:-translate-y-0.5 transition-transform"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
