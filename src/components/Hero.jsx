import { hero } from "../assets";
function Hero() {
  return (
    <div className=" w-full min-h-[480px] h-full grid grid-cols-1 container max-w-[1380px] mx-auto px-10 ">
      <div className="flex items-center justify-center gap-24">
        <h1 className="text-center text-6xl m-0 leading-loose">
          Fastes Delivery ! <br />
          <span className="font-bold">Order Now<span className="text-red-700">...</span></span>
        </h1>

        <img className="max-w-[580px] w-full" src={hero} alt="" />
      </div>
    </div>
  );
}

export default Hero;
