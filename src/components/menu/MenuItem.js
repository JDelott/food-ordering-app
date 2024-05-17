import { useState, useContext } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";

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
          <div className="bg-white p-4 rounded-md">test</div>
        </div>
      )}
      <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
        <div className="text-center">
          <img
            src={image}
            className="max-h-auto max-h-24 block mx-auto"
            alt="pizza"
          />
        </div>
        <h4 className="font-semibold text-xl my-3">{name} </h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          type="button"
          onClick={handleAddToCartButtonClick}
          className="mt-4 bg-primary text-white rounded-full px-8 py-2"
        >
          Add to cart ${basePrice}
        </button>
      </div>
    </>
  );
}
