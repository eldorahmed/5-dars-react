import { hero } from "../assets";
function Hero() {
  return (
    <div className=" w-full min-h-[480px] h-full grid grid-cols-1 container max-w-[1380px] mx-auto px-4 sm:px-10 ">
      <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-24">
        <div>
          <h1 className="text-center text-3xl sm:text-6xl m-0 sm:leading-loose">
            Fastes Delivery ! <br />
            <span className="font-bold">
              Order Now<span className="text-red-700">...</span>
            </span>
          </h1>
        </div>

        <img className="max-w-[580px] w-full" src={hero} alt="" />
      </div>
    </div>
  );
}

export default Hero;
