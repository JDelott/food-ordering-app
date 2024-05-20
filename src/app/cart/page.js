"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                className="flex gap-4 border-b py-2 mb-4 items-center"
                key={product._id}
              >
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Extras:
                      {product.extras.map((extra) => (
                        <div key={extra._id}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(product)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div>right</div>
      </div>
    </section>
  );
}
