import { Package, ShoppingCart, TrendingUp, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* All Orders Metric */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                <ShoppingCart className="text-gray-500" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">All Orders</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">10,525</span>
              <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                <ArrowUpRight size={14} className="mr-0.5" />
                15.2%
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              An order data range of 5,567 to 7,525 for the last 7 days.
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-1.5 w-1/3 bg-[#1E3023] rounded-full"></div>
            <span className="text-xs font-medium text-gray-400">1,100+ Today</span>
          </div>
        </div>

        {/* All Products Metric */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                <Package className="text-orange-500" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">All Products</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">512</span>
              <span className="flex items-center text-sm font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-1">
                <ArrowUpRight size={14} className="mr-0.5" />
                10.25%
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              An product data range of 5,567 to 7,525 for the last 7 days.
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-1.5 w-1/3 bg-orange-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-400">600+ Today</span>
          </div>
        </div>

        {/* Products Sold Metric */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <TrendingUp className="text-emerald-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">Products Sold</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">320</span>
              <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                <ArrowUpRight size={14} className="mr-0.5" />
                27.2%
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              An sold data range of 5,567 to 7,525 for the last 7 days.
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-1.5 w-1/3 bg-teal-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-400">170+ Today</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Month (Placeholder for Chart) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">Sales by Month</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#1E3023]/20">
              <option>Months</option>
              <option>Weeks</option>
            </select>
          </div>
          <div className="flex gap-4 mb-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1E3023]"></span> Espresso</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Latte</div>
          </div>
          {/* Chart Bars Placeholder */}
          <div className="flex-1 flex items-end justify-between px-4 pb-2 relative">
             <div className="absolute top-1/4 left-0 right-0 border-t border-gray-100 border-dashed"></div>
             <div className="absolute top-2/4 left-0 right-0 border-t border-gray-100 border-dashed"></div>
             <div className="absolute top-3/4 left-0 right-0 border-t border-gray-100 border-dashed"></div>
             
             {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, i) => (
                <div key={month} className="flex flex-col items-center gap-2 z-10 w-full group">
                  <div className="flex items-end gap-1.5 h-48 w-full justify-center">
                    <div className="w-3 bg-gray-200 rounded-t-sm group-hover:bg-[#1E3023] transition-colors" style={{height: `${Math.max(20, Math.random() * 80)}%`}}></div>
                    <div className="w-3 bg-orange-100 rounded-t-sm group-hover:bg-orange-400 transition-colors" style={{height: `${Math.max(20, Math.random() * 60)}%`}}></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{month}</span>
                </div>
             ))}
          </div>
        </div>

        {/* Financial History */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-96 flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">Financial History</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="bg-[#F0F5F1] rounded-2xl p-5 flex items-center gap-5">
              <div className="relative w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-4 border-[#1E3023]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)'}}></div>
                 <span className="text-sm font-semibold text-gray-700">75%</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">New Income</p>
                <p className="text-2xl font-bold text-gray-900">$26,100.00</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-5 shadow-sm">
              <div className="relative w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-4 border-orange-500" style={{clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)'}}></div>
                 <span className="text-sm font-semibold text-gray-700">35%</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Average Spend</p>
                <p className="text-2xl font-bold text-gray-900">$8,076.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
