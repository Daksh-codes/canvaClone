import React from "react";
import beautifulImage from "../assets/image 1.png";
import buildImage from "../assets/image 2.png";
import poster1 from "../assets/image 3.png";
import poster2 from "../assets/image 4.png";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HomePage() {
  const user = useSelector((state) => state.user);

  return (
    <div className="text-neutral-800 bg-white ">
      <Navbar />
      <div className="relative flex  h-[100vh]" style={{ fontFamily: "Viga" }}>
        <div className="text-8xl m-20   ">
          <h1 className="absolute top-32 flex items-center">
            Build
            <img src={buildImage} alt="" className=" w-24 mix-blend-multiply" />
          </h1>
          <h1 className="absolute top-52 flex items-center">
            <img
              src={beautifulImage}
              alt=""
              className=" w-36 mix-blend-multiply"
            />
            Beautiful
          </h1>
          <h1 className="absolute top-80 flex items-center">Graphics Faster</h1>
          <button className="absolute top-[27rem] text-3xl bg-orange-300 px-4 py-2 rounded-lg hover:bg-orange-600">
            {user ? <Link to={"/dashboard"}>Dashboard</Link>: <Link to={"/register"}>Get started for free</Link>}
          </button>
        </div>
        <div className="">
          <img
            src={poster1}
            alt=""
            className="shadow-black shadow absolute top-12  right-64"
          />
          <img
            src={poster2}
            alt=""
            className="shadow-black shadow absolute top-40 right-32"
          />
        </div>
      </div>
      {/* About  */}
      <div className="mx-12 mt-12 border-t-2 border-neutral-600 ">
        <h1 className="text-[42px] mb-4 mt-12">About</h1>
        <p className="text-[24px] font-medium pb-4">
          Welcome to Artsy, your go-to destination for crafting eye-catching
          posters effortlessly! Artsy is a user-friendly designed specifically
          for creating stunning posters with ease. Whether you're promoting an
          event, marketing a product, or simply expressing your creativity,
          Artsy streamlines the design process, making it accessible to
          everyone.
        </p>
        <p className="text-[24px] font-medium pb-4">
          With an intuitive drag-and-drop interface, a rich library of
          templates, and a myriad of customization options, Artsy ensures that
          designing your perfect poster is not only efficient but also
          enjoyable. Our platform focuses on simplicity without compromising on
          creativity, making it the ideal tool for both beginners and
          experienced designers. Elevate your poster-making experience with
          Artsy and let your ideas shine in vibrant colors!
        </p>
      </div>
      {/* Reviews  */}
      <div className="mx-12 mt-12 border-t-2 border-neutral-600 flex gap-4 pb-4">
        <div className="w-1/3 flex flex-col items-center p-8 gap-4 border-2 bg-sky-200 mt-12 border-stone-600">
          <h3 className="text-[24px]">Effortless Designing</h3>
          <p className="break-words text-pretty text-center indent-8">
            ARTSY's intuitive interface made designing my poster a breeze. The
            diverse templates let me unleash my creativity without any hassle. A
            must-try for anyone needing a quick and stylish poster.
          </p>
          <h6>-Mukesh Ambani</h6>
        </div>
        <div className="w-1/3 flex flex-col items-center p-8 gap-4 border-2 bg-red-200 mt-12 border-stone-600 ">
          <h3 className="text-[24px]">User-Friendly Magic</h3>
          <p className="break-words text-pretty text-center indent-8">
            ARTSY is a user-friendly app that simplifies poster creation. The
            variety of templates and customization options cater to every need.
            From events to promotions, this app effortlessly turns ideas into
            visually appealing posters.
          </p>
          <h6>-Nikhil Jaisinghani</h6>
        </div>
        <div className="w-1/3 flex flex-col items-center p-8 gap-4 border-2 bg-yellow-200 mt-12 border-stone-600 ">
          <h3 className="text-[24px]">Design Delight</h3>
          <p className="break-words text-pretty text-center indent-8">
            ARTSY exceeded my expectations. Its simplicity and diverse templates
            made poster designing enjoyable. Whether you're a novice or pro,
            this app is a game-changer for crafting visually striking posters in
            no time.
          </p>
          <h6>-Varun Rohra</h6>
        </div>
      </div>

      <div className="bg-orange-200 p-12 pt-32 flex items-center gap-8">
        <h1 className="text-5xl">Lets go get ARTSY for free</h1>
        <button className="bg-orange-500 px-4 py-2 rounded-lg text-xl hover:bg-yellow-500">
          Get started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
