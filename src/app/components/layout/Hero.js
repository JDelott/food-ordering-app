import Image from "next/image"


export default function Hero(){
    return (
        <section className="grid grid-cols-2">
            <div>
                <h1 className="text-4xl">Everything is bettter with a Pizza</h1>
                <p className="mt-4 text-gray-500">
                    Pizza is the missing piece that makes every day complete, a simple yet delicous joy in life
                </p>
            
            <div className="flex gap-4">
                <button className="bg-primary text-white px-8 py-2 rounded-full">
                Order now
                </button>
                <button>Learn more </button>
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} layout={'fill'} 
                objectFit={'contain'} alt={'pizza'} />
            </div>
            </div>
        </section>
    )
}
