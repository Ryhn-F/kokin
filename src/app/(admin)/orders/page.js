"use client";

import { useState } from "react";
import { Search, Clock, CheckCircle2, ChevronRight, Filter } from "lucide-react";

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-8372",
      customer: "Eleanor Pena",
      status: "Preparing",
      time: "10:00 AM",
      items: [
        { name: "Iced Caramel Macchiato", qty: 2, price: 4.50 },
        { name: "Almond Croissant", qty: 1, price: 3.50 }
      ],
      total: 12.50
    },
    {
      id: "ORD-8373",
      customer: "Jacob Jones",
      status: "Ready",
      time: "10:15 AM",
      items: [
        { name: "Espresso", qty: 1, price: 2.50 }
      ],
      total: 2.50
    },
    {
      id: "ORD-8374",
      customer: "Floyd Miles",
      status: "New",
      time: "10:22 AM",
      items: [
        { name: "Matcha Latte", qty: 1, price: 4.00 },
        { name: "Blueberry Muffin", qty: 2, price: 3.00 }
      ],
      total: 10.00
    },
    {
      id: "ORD-8375",
      customer: "Kristin Watson",
      status: "New",
      time: "10:30 AM",
      items: [
        { name: "Cappuccino", qty: 1, price: 3.50 }
      ],
      total: 3.50
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Preparing': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Ready': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 min-h-[80vh]">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Orders</h2>
          <p className="text-gray-500 text-sm mt-1">Manage incoming orders for the kitchen</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search order ID..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-gray-400 mb-1 block">{order.id}</span>
                <h3 className="font-bold text-gray-800">{order.customer}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-500 mb-3 border-b border-gray-100 pb-2">Order Items:</div>
              <ul className="space-y-3 mb-6">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700"><span className="font-semibold text-gray-900 mr-2">{item.qty}x</span> {item.name}</span>
                    <span className="text-gray-500">${(item.qty * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                {order.status === 'New' && (
                  <button className="flex-1 bg-[#1E3023] hover:bg-[#2a4231] text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Start Preparing
                  </button>
                )}
                {order.status === 'Preparing' && (
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Mark as Ready
                  </button>
                )}
                {order.status === 'Ready' && (
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
