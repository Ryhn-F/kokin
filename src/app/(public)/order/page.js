import Footer from "@/components/homepage/Footer";
import OrderClient from "@/components/order/OrderClient";

export const metadata = {
  title: "Complete Order | Kokin Coffee",
  description: "Complete your order and reserve a table at Kokin Coffee.",
};

export default function OrderPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen w-full flex flex-col">
      <main className="flex-grow flex flex-col w-full relative">
        <div className="bg-surface-container pt-12 pb-24 px-margin-desktop w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 py-12 md:py-16">
            <div className="inline-block bg-surface-variant/60 px-5 py-2 rounded-full border border-outline-variant/30 backdrop-blur-sm mb-6 shadow-sm">
              <span className="font-label-md text-on-surface-variant uppercase tracking-widest">Secure Checkout</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-6">
              Complete Your Order
            </h1>
            
            <p className="font-body-lg text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Freshly brewed coffee and cozy reservations in one seamless experience.
            </p>
            
            <div className="w-20 h-1 bg-primary rounded-full opacity-80"></div>
          </div>
        </div>

        <OrderClient />
      </main>
      <Footer />
    </div>
  );
}
