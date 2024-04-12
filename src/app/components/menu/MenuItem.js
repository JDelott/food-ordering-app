export default function MenuItem(){
    return (
        <div className="bg-gray-200 p-4 m-10 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/50 
        transition-all">
           <div className="text-center">
             <img src="/pizza.png" className="max-h-auto max-w-24 block mx-auto"
              alt="pizza"/>
           </div>
            <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">
                lorem ipsom dolor sit amet , consectutur adipisicing 
                elit
            </p>
        <button className="mt-4 bg-primary text-white rounded full 
            px-8 py-2">Add to cart $12</button>
        </div>

    )
}
