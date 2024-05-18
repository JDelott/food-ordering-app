import { useState, useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart!");
    } else {
      setShowPopup(true);
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed bg-black/80 inset-0 flex items-center h-full justify-center"
        >
          <div className="bg-white p-4 rounded-md">
            <Image
              src={image}
              alt={name}
              width={300}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center font-bold text-sm mb-2">{description}</p>
            {sizes?.length > 0 && (
              <div className="p-2">
                <h3>Pick your size</h3>
                {sizes.map((size) => (
                  <label
                    key={size.id}
                    className="flex items-center gap-2 py-4 px-4 border rounded-md mb-1"
                  >
                    <input type="radio" name="size" /> {size.name} $
                    {basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
