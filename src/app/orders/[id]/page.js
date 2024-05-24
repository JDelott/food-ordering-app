"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext } from "@/components/AppContext";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import { useParams } from "next/navigation";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call you when it is on the way</p>
        </div>
      </div>
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>left - products</div>
          <div>right - address</div>
        </div>
      )}
    </section>
  );
}
