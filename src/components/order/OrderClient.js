"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  User, Phone, Calendar, Clock, Users, Coffee, Trash2, Plus, Minus, CheckCircle2, ShoppingBag, Armchair, AlertCircle, ArrowRight, Loader2
} from "lucide-react";
import axios from "axios";

export default function OrderClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, success, error
  const [errorMessage, setErrorMessage] = useState("");
  
  // States
  const [cartItems, setCartItems] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [seats, setSeats] = useState([]);
  
  // Form State
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "" });
  const [isReserving, setIsReserving] = useState(false);
  const [reservation, setReservation] = useState({
    guestCount: 2,
    date: "",
    startTime: "",
    endTime: ""
  });
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  
  // Validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        // Fetch Seats
        try {
          const seatRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/seat`);
          const fetchedSeats = Array.isArray(seatRes.data) ? seatRes.data : (seatRes.data?.data || []);
          setSeats(fetchedSeats);
        } catch (err) {
          console.error("Failed to load seats", err);
        }

        // Fetch products for selection
        try {
          const prodRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`);
          let allProducts = [];
          if (Array.isArray(prodRes.data)) allProducts = prodRes.data;
          else if (prodRes.data && Array.isArray(prodRes.data.data)) allProducts = prodRes.data.data;
          else if (prodRes.data && Array.isArray(prodRes.data.products)) allProducts = prodRes.data.products;
          
          setAvailableProducts(allProducts);
        } catch (err) {
          console.error("Failed to load mock cart", err);
        }
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("kokin_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse cart", e);
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(price);
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...cartItems];
    const newQuantity = newItems[index].cartQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= (newItems[index].stock || 99)) {
      newItems[index].cartQuantity = newQuantity;
      setCartItems(newItems);
      localStorage.setItem("kokin_cart", JSON.stringify(newItems));
    }
  };

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    localStorage.setItem("kokin_cart", JSON.stringify(newItems));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = "Name is required";
    if (!customerInfo.phone.trim()) newErrors.phone = "Phone is required";
    
    if (isReserving) {
      if (!reservation.date) newErrors.date = "Date is required";
      if (!reservation.startTime) newErrors.startTime = "Start time is required";
      if (!reservation.endTime) newErrors.endTime = "End time is required";
      if (!selectedSeatId) newErrors.seat = "Please select a seat";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;
    if (!validateForm()) {
      // Scroll to top to show errors or just let the red outlines show
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    
    const payload = {
      person_name: customerInfo.name,
      no_telp: customerInfo.phone,
      id_product: cartItems.map(i => i.id),
      quantity: cartItems.map(i => i.cartQuantity)
    };

    if (isReserving) {
      payload.seat_id = selectedSeatId;
      payload.guest_count = Number(reservation.guestCount);
      payload.reservation_date = reservation.date;
      payload.reservation_time = reservation.startTime;
      payload.reservation_end_time = reservation.endTime;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/order`, payload);
      setSubmitStatus("success");
      setCartItems([]);
      localStorage.removeItem("kokin_cart");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please check stock or reservation overlaps.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-3xl mx-auto px-margin-desktop py-24 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center text-primary mb-8 shadow-sm">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="font-display text-4xl text-on-surface mb-4">Order Placed Successfully!</h2>
        <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
          Thank you for choosing Kokin. Your order has been confirmed and our baristas will start preparing it soon.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/menu")} variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-outline-variant hover:bg-surface-variant">
            Order Again
          </Button>
          <Button onClick={() => router.push("/")} className="rounded-full px-8 py-6 text-lg bg-primary text-on-primary shadow-md hover:-translate-y-1 transition-all">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-margin-desktop py-12 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Coffee size={40} className="animate-bounce" />
          <span className="font-label-lg animate-pulse">Brewing your experience...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-margin-desktop py-12 md:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16">
      
      {/* LEFT COLUMN - FORM & CART */}
      <div className="w-full lg:w-2/3 flex flex-col gap-10">
        
        {/* Customer Information */}
        <section className="bg-surface-container-highest rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex justify-center items-center">
              <User size={24} />
            </div>
            <h2 className="font-display text-3xl text-on-surface">Your Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-on-surface-variant ml-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className={`w-full bg-surface px-6 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-red-500' : 'border-outline-variant/50 focus:border-primary'}`}
                value={customerInfo.name}
                onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
              />
              {errors.name && <span className="text-red-500 text-sm ml-2 flex items-center gap-1"><AlertCircle size={14}/> {errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-on-surface-variant ml-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="08123456789"
                className={`w-full bg-surface px-6 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-red-500' : 'border-outline-variant/50 focus:border-primary'}`}
                value={customerInfo.phone}
                onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
              />
              {errors.phone && <span className="text-red-500 text-sm ml-2 flex items-center gap-1"><AlertCircle size={14}/> {errors.phone}</span>}
            </div>
          </div>
        </section>

        {/* Ordered Products */}
        <section className="bg-surface-container-highest rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex justify-center items-center">
                <Coffee size={24} />
              </div>
              <h2 className="font-display text-3xl text-on-surface">Your Drinks</h2>
            </div>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto text-on-surface-variant mb-4" size={48} opacity={0.5} />
              <p className="font-body-lg text-on-surface-variant mb-6">Your cart is currently empty.</p>
              <Button onClick={() => router.push("/menu")} className="rounded-full bg-primary text-on-primary">Browse Menu</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex flex-col sm:flex-row items-center gap-6 bg-surface p-4 rounded-3xl border border-outline-variant/30 group hover:shadow-md transition-all">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden relative bg-surface-container shrink-0">
                    <Image 
                      src={item.image_url || "/images/homepage/menu-latte.jpg"} 
                      alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-grow flex flex-col w-full">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-sm text-on-surface line-clamp-1">{item.name}</h3>
                      <button onClick={() => removeItem(index)} className="text-on-surface-variant hover:text-red-500 transition-colors p-1">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <span className="font-label-sm text-primary mb-4">{item.category || "Beverage"}</span>
                    <div className="flex items-center justify-between w-full">
                      <div className="font-headline-sm text-on-surface">
                        {formatPrice(item.price)}
                      </div>
                      <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/40">
                        <button onClick={() => updateQuantity(index, -1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-label-md">{item.cartQuantity}</span>
                        <button onClick={() => updateQuantity(index, 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Product Section */}
          <div className="mt-8 border-t border-outline-variant/30 pt-8">
            <h3 className="font-headline-sm text-on-surface mb-6 flex items-center gap-2">
              <Plus size={20} className="text-primary" />
              Add drinks to your order
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableProducts.filter(p => !cartItems.find(c => c.id === p.id)).map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-surface-container shrink-0">
                      <Image src={product.image_url || "/images/homepage/menu-latte.jpg"} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-on-surface line-clamp-1">{product.name}</span>
                      <span className="font-label-md text-on-surface-variant">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newItems = [...cartItems, { ...product, cartQuantity: 1 }];
                      setCartItems(newItems);
                      localStorage.setItem("kokin_cart", JSON.stringify(newItems));
                    }}
                    className="w-10 h-10 rounded-full bg-surface-variant/50 text-on-surface flex justify-center items-center hover:bg-primary hover:text-on-primary transition-colors shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))}
              {availableProducts.filter(p => !cartItems.find(c => c.id === p.id)).length === 0 && (
                <div className="col-span-1 sm:col-span-2 text-center py-4 text-on-surface-variant font-label-md bg-surface-variant/20 rounded-2xl border border-outline-variant/20">
                  All available drinks are in your cart.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reservation Toggle & Section */}
        <section className="bg-surface-container-highest rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30 transition-all duration-500">
          <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsReserving(!isReserving)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex justify-center items-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <Armchair size={24} />
              </div>
              <div>
                <h2 className="font-display text-3xl text-on-surface">Reserve Your Table</h2>
                <p className="font-body-md text-on-surface-variant">Dine-in with a guaranteed spot</p>
              </div>
            </div>
            <div className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${isReserving ? 'bg-primary' : 'bg-surface-variant'}`}>
              <div className={`w-6 h-6 rounded-full bg-surface shadow-sm transform transition-transform duration-300 ${isReserving ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className={`grid transition-all duration-500 ease-in-out ${isReserving ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden flex flex-col gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-2 flex items-center gap-2"><Calendar size={16}/> Date</label>
                  <input 
                    type="date"
                    className={`w-full bg-surface px-6 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-primary/20 ${errors.date ? 'border-red-500' : 'border-outline-variant/50 focus:border-primary'}`}
                    value={reservation.date}
                    onChange={e => setReservation({...reservation, date: e.target.value})}
                  />
                  {errors.date && <span className="text-red-500 text-sm ml-2">{errors.date}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-2 flex items-center gap-2"><Users size={16}/> Guests</label>
                  <div className="flex items-center bg-surface rounded-2xl border border-outline-variant/50 p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-[58px]">
                    <button onClick={() => setReservation({...reservation, guestCount: Math.max(1, reservation.guestCount - 1)})} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-variant text-on-surface-variant"><Minus size={18}/></button>
                    <span className="flex-grow text-center font-label-lg">{reservation.guestCount} People</span>
                    <button onClick={() => setReservation({...reservation, guestCount: reservation.guestCount + 1})} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-variant text-on-surface-variant"><Plus size={18}/></button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-2 flex items-center gap-2"><Clock size={16}/> Start Time</label>
                  <input 
                    type="time"
                    className={`w-full bg-surface px-6 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-primary/20 ${errors.startTime ? 'border-red-500' : 'border-outline-variant/50 focus:border-primary'}`}
                    value={reservation.startTime}
                    onChange={e => setReservation({...reservation, startTime: e.target.value})}
                  />
                  {errors.startTime && <span className="text-red-500 text-sm ml-2">{errors.startTime}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant ml-2 flex items-center gap-2"><Clock size={16}/> End Time</label>
                  <input 
                    type="time"
                    className={`w-full bg-surface px-6 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-primary/20 ${errors.endTime ? 'border-red-500' : 'border-outline-variant/50 focus:border-primary'}`}
                    value={reservation.endTime}
                    onChange={e => setReservation({...reservation, endTime: e.target.value})}
                  />
                  {errors.endTime && <span className="text-red-500 text-sm ml-2">{errors.endTime}</span>}
                </div>
              </div>

              {/* Seat Selection */}
              <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline-sm text-on-surface">Select a Seat</h3>
                  {errors.seat && <span className="text-red-500 text-sm animate-pulse flex items-center gap-1"><AlertCircle size={14}/> {errors.seat}</span>}
                </div>
                
                {seats.length === 0 ? (
                  <div className="p-6 bg-surface rounded-2xl border border-outline-variant/30 text-center text-on-surface-variant text-sm">
                    No seats available at the moment.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {seats.map((seat) => (
                      <button
                        key={seat.id}
                        disabled={seat.status !== 'available'}
                        onClick={() => setSelectedSeatId(seat.id)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-300 relative overflow-hidden group
                          ${seat.status !== 'available' 
                            ? 'bg-surface-variant/30 opacity-50 cursor-not-allowed border border-outline-variant/20' 
                            : selectedSeatId === seat.id
                              ? 'bg-primary text-on-primary shadow-md border-2 border-primary scale-105'
                              : 'bg-surface border border-outline-variant/40 hover:border-primary/50 hover:bg-primary-container/20 text-on-surface'
                          }
                        `}
                      >
                        <span className="font-headline-sm mb-1 z-10">{seat.seat_number}</span>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-80 z-10">
                          <Users size={10} /> {seat.capacity}
                        </div>
                        {selectedSeatId === seat.id && (
                          <div className="absolute top-1.5 right-1.5 z-10">
                            <CheckCircle2 size={12} className="text-on-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end items-center gap-4 text-xs font-label-md mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-surface border border-outline-variant/40"></div> Available</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary"></div> Selected</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-surface-variant/50"></div> Booked</div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* RIGHT COLUMN - SUMMARY */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="sticky top-24 bg-surface-container-low rounded-[2.5rem] p-8 shadow-lg border border-outline-variant/30 flex flex-col gap-6">
          <h3 className="font-display text-2xl text-on-surface mb-2 border-b border-outline-variant/30 pb-4">Order Summary</h3>
          
          <div className="flex flex-col gap-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="font-label-lg text-on-surface">{item.name}</span>
                  <span className="text-on-surface-variant">x {item.cartQuantity}</span>
                </div>
                <span className="font-headline-sm text-on-surface text-right">
                  {formatPrice(item.price * item.cartQuantity)}
                </span>
              </div>
            ))}
          </div>
          
          {isReserving && (
            <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/30 bg-surface-container-highest rounded-2xl p-4">
              <span className="font-label-lg text-primary flex items-center gap-2"><Armchair size={16}/> Reservation Added</span>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-on-surface-variant">Date:</span>
                <span className="text-right font-label-md text-on-surface">{reservation.date || '-'}</span>
                <span className="text-on-surface-variant">Time:</span>
                <span className="text-right font-label-md text-on-surface">{reservation.startTime && reservation.endTime ? `${reservation.startTime} - ${reservation.endTime}` : '-'}</span>
                <span className="text-on-surface-variant">Seat:</span>
                <span className="text-right font-label-md text-on-surface">{seats.find(s => s.id === selectedSeatId)?.seat_number || '-'}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30 mt-2">
            <span className="font-headline-sm text-on-surface-variant uppercase tracking-widest">Total</span>
            <span className="font-display text-3xl text-on-surface text-right">{formatPrice(subtotal)}</span>
          </div>
          
          {submitStatus === "error" && (
            <div className="bg-red-500/10 text-red-600 p-4 rounded-xl text-sm flex gap-2 items-start">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <Button 
              onClick={handleSubmitOrder}
              disabled={cartItems.length === 0 || isSubmitting}
              className="w-full bg-primary text-on-primary text-lg font-label-lg py-7 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-2 group"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Place Order"} 
              {!isSubmitting && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
            </Button>
            <Button 
              onClick={() => router.push("/menu")}
              variant="ghost"
              className="w-full text-on-surface-variant text-base font-label-md py-6 rounded-full hover:bg-surface-variant transition-colors"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 p-5 pb-8 flex flex-col gap-4 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
           <div className="flex flex-col gap-1">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">Total</span>
            <span className="font-headline-lg text-on-surface text-2xl">{formatPrice(subtotal)}</span>
          </div>
          <Button 
            onClick={handleSubmitOrder}
            disabled={cartItems.length === 0 || isSubmitting}
            className="bg-primary text-on-primary font-label-lg px-8 py-7 rounded-full shadow-lg min-w-[160px]"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Place Order"}
          </Button>
        </div>
      </div>

    </div>
  );
}
