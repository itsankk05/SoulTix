import SilverHand from "../images/Silver-Hand.png";
import nft1 from "../images/nft1.webp";
import concert1 from "../images/concert1.jpg";
import concert3 from "../images/concert3.webp";
import art1 from "../images/art1.jpg";
import art2 from "../images/art2.jpg";
import art3 from "../images/art3.jpg";
import art4 from "../images/art4.jpg";

export default function Description() {
  return (
    <div>
      <section
        id="section2"
        className="flex justify-center border border-b-gray-800 border-transparent"
      >
        <div className="content-wrapper container my-28 2xl:px-20 ">
          <div className=""></div>

          <div id="card-wrapper" className="mt-36 2xl:px-24 block">
            <div className="flex flex-col gap-16 px-3 lg:px-0 mx-auto justify-center w-full lg:flex-row lg:gap-4 lg:h-100 2xl:h-128">
              <div className="card-body border border-gray-900 overflow-hidden h-full relative rounded-xl snap-center p-6 basis-1/3  flex flex-col justify-center">
                <h4 className="text-2xl text-white mt-4 mb-6 font-Sora font-normal tracking-wider">
                  Check out the <br /> most popular NFT's
                </h4>
                <button
                  id="button-carousel"
                  className="py-5 px-6 z-20 text-white rounded-full absolute backdrop-blur-sm right-8 top-72"
                >
                  <i className="bx bx-chevron-right leading-2 text-4xl font-thin"></i>
                </button>
                <div className="img-wrapper overflow-y-hidden relative w-full flex flex-row gap-5">
                  <div data-status="active" className="min-w-56 ">
                    <img
                      className="my-3 rounded-xl w-full h-80 object-cover"
                      src={concert1}
                      alt="Item Slider"
                    />
                    <hr className="border-gray-800 my-4" />
                  </div>
                  <div data-status="inactive" className="min-w-56">
                    <img
                      className="my-3 rounded-xl w-full h-80 object-cover"
                      src={concert3}
                      alt="Item Slider"
                    />{" "}
                    <p className="text-white text-sm font-Sora">
                      Black Panther
                      <br />
                    </p>
                    <hr className="border-gray-800 my-4" />
                  </div>
                  <div data-status="inactive" className="min-w-56">
                    <img
                      className="my-3 rounded-xl w-full h-80 object-cover"
                      src="https://slwehdbwpcxuqrwxmwqq.supabase.co/storage/v1/object/public/nft-images/dbfa56475c5c785d45660626f9e30473.jpg"
                      alt="Item Slider"
                    />{" "}
                    <p className="text-white text-sm font-Sora">
                      Skull
                      <br />
                    </p>
                    <hr className="border-gray-800 my-4" />
                  </div>
                </div>
              </div>
              <div
                id="card-2"
                className="card-body relative rounded-xl border border-gray-900 bg-midnight snap-center p-3 basis-1/3 h-full min-h-full flex flex-col justify-center items-start gap-0"
              >
                <div className="relative sm:left-1/4 lg:left-2.5 -top-24 lg:-top-16 z-10 -mb-24">
                  <img
                    className="w-full h-full"
                    src={SilverHand}
                    alt="Silver Hand"
                  />
                </div>
                <div className="px-6 pt-4 w-full relative z-20 mt-auto">
                  <h4 className="text-xl md:text-2xl text-white font-Sora mb-3">
                    Get started collecting
                    <br className="hidden lg:block" /> your NFTs
                  </h4>
                  <p className="text-slate-500 text-sm font-Inter">
                    Get started creating your NFTs and
                    <br /> bring your digital assets to life with ease.
                  </p>
                </div>
              </div>
              <div className="card-body border border-gray-900 rounded-xl px-8 py-4 basis-1/3 h-full flex flex-col justify-center lg:justify-start">
                <h3 className="mt-6 text-white text-xl md:text-2xl font-Sora text-center lg:text-start">
                  Top NFT's to gain
                  <br className="hidden lg:block" />
                </h3>
                <div className="flex flex-row gap-4 mx-auto lg:mx-0 mt-7">
                  <img
                    className="aspect-square rounded-2xl"
                    alt="Card item"
                    src={art1}
                    width="110"
                    height="110"
                  />

                  <div className="flex justify-between flex-col">
                    <div className="text-wrapper-ellips">
                      <div className="flex flex-row justify-start lg:justify-between">
                        <div className="text-white text-xs hidden lg:flex items-center  font-Sora">
                          <i className="bx bx-time text-sm font-thin leading-4 pr-2"></i>
                        </div>
                        <span
                          className="bg-buttonBG text-buttonTxt rounded-sm font-Sora font-bold text-center flex items-center h-5 py-3 px-3 mb-2 whitespace-nowrap text-xs"
                          style={{ fontSize: "11px" }}
                        >
                          &#32;
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between  pb-2">
                      <div className="text-gray-600 text-xs font-Inter"></div>
                      <div className="text-gray-600 text-xs flex items-center font-Sora ml-auto">
                        <i className="bx bx-heart leading-4 text-xl font-thin mr-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 mx-auto lg:mx-0 mt-4">
                  <img
                    className="aspect-square rounded-2xl"
                    alt="Card item"
                    src={art2}
                    width="110"
                    height="110"
                  />

                  <div className="flex justify-between flex-col">
                    <div className="text-wrapper-ellips">
                      <div className="flex flex-row justify-start lg:justify-between">
                        <div className="text-white text-xs hidden lg:flex items-center  font-Sora">
                          <i className="bx bx-time text-sm font-thin leading-4 pr-2"></i>
                        </div>
                        <span
                          className="bg-buttonBG text-buttonTxt rounded-sm font-Sora font-bold text-center flex items-center h-5 py-3 px-3 mb-2 whitespace-nowrap text-xs"
                          style={{ fontSize: "11px" }}
                        >
                          &#32;
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between  pb-2">
                      <div className="text-gray-600 text-xs font-Inter"></div>
                      <div className="text-gray-600 text-xs flex items-center font-Sora ml-auto">
                        <i className="bx bx-heart leading-4 text-xl font-thin mr-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 mx-auto lg:mx-0 mt-4">
                  <img
                    className="aspect-square rounded-2xl"
                    alt="Card item"
                    src={art3}
                    width="110"
                    height="110"
                  />

                  <div className="flex justify-between flex-col">
                    <div className="text-wrapper-ellips">
                      <div className="flex flex-row justify-start lg:justify-between">
                        <div className="text-white text-xs hidden lg:flex items-center  font-Sora">
                          <i className="bx bx-time text-sm font-thin leading-4 pr-2"></i>
                        </div>
                        <span
                          className="bg-buttonBG text-buttonTxt rounded-sm font-Sora font-bold text-center flex items-center h-5 py-3 px-3 mb-2 whitespace-nowrap text-xs"
                          style={{ fontSize: "11px" }}
                        >
                          &#32;
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between  pb-2">
                      <div className="text-gray-600 text-xs font-Inter"></div>
                      <div className="text-gray-600 text-xs flex items-center font-Sora ml-auto">
                        <i className="bx bx-heart leading-4 text-xl font-thin mr-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 mx-auto lg:mx-0 mt-4">
                  <img
                    className="aspect-square rounded-2xl"
                    alt="Card item"
                    src={art4}
                    width="110"
                    height="110"
                  />

                  <div className="flex justify-between flex-col">
                    <div className="text-wrapper-ellips">
                      <div className="flex flex-row justify-start lg:justify-between">
                        <div className="text-white text-xs hidden lg:flex items-center  font-Sora">
                          <i className="bx bx-time text-sm font-thin leading-4 pr-2"></i>
                        </div>
                        <span
                          className="bg-buttonBG text-buttonTxt rounded-sm font-Sora font-bold text-center flex items-center h-5 py-3 px-3 mb-2 whitespace-nowrap text-xs"
                          style={{ fontSize: "11px" }}
                        >
                          &#32;
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-between  pb-2">
                      <div className="text-gray-600 text-xs font-Inter"></div>
                      <div className="text-gray-600 text-xs flex items-center font-Sora ml-auto">
                        <i className="bx bx-heart leading-4 text-xl font-thin mr-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-16 lg:flex-row mt-36"></div>
        </div>
      </section>
    </div>
  );
}
