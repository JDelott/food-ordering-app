"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
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
                      Extras:{" "}
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
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">Subtotal:${total}</div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
