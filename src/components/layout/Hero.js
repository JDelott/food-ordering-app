// import Image from "next/image"
// import Right from "../icons/Right"

// export default function Hero(){
//     return (
//         <section className="hero">
//             <div className="py-12">
//                 <h1 className="text-4xl">Everything is bettter with a Pizza</h1>
//                 <p className="my-4 text-gray-500">
//                     Pizza is the missing piece that makes every day complete, a simple yet delicous joy in life
//                 </p>

//             <div className="flex gap-4 text-sm">
//                 <button className="bg-primary uppercase flex gap-2 text-white px-4 py-2 rounded-full text-sm">
//                  Order now
//                  <Right/>
//                 </button>
//                 <button className="flex gap-2 py-2 text-gray-600 font-semibold">
//                  Learn more
//                  <Right/>
//                 </button>
//             </div>
//             <div className="relative">
//                 <Image src={'/pizza.png'} layout={'fill'}
//                 objectFit={'contain'} alt={'pizza'} />
//             </div>
//             </div>
//         </section>
//     )
// }

import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br />
          is better <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>

        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-primary uppercase flex gap-2 text-white px-4 py-2 rounded-full text-sm">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block" style={{ height: "300px" }}>
        {" "}
        {/* Adjust height as needed */}
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
