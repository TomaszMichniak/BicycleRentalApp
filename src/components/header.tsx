export default function Header() {
    return(
        <header  className="bg-[url('./src/assets/DSC_11_640.jpg')] md:bg-[url('./src/assets/11.jpg')] bg-cover bg-center h-96 md:h-[700px] lg:h-[800px] relative">
        <div  className="w-full h-full bg-black/10 absolute  " ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-2xl md:text-5xl mb-3">Wypożyczalnia rowerów elektrycznych</h1>
            <p className="text-sm md:text-xl">PM eMountainBikes</p>
        </div>
    </header>
    )
}
