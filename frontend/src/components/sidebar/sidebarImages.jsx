import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../pagination";
import { useDispatch } from "react-redux";
import { addElement } from "../../slices/elementsSlice";

function SidebarImages() {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; 
  const dispatch = useDispatch();
  useEffect(() => {
    const getImages = async () => {
      const res = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${
          import.meta.env.VITE_UNSPLASH_KEY
        }&per_page=${30}&order_by:popular`
      );
      console.log(res.data)
      setImages(res.data);
    };
    getImages();
  }, []);

  const searchImages = async () => {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=${
        import.meta.env.VITE_UNSPLASH_KEY
      }&query=${searchText}&per_page=${30}&order_by=relevant`
    );
    setImages(res.data.results);
  };

  const changePage = (btn) => {
    if (btn === "prev") {
      currentPage === 1 ? setCurrentPage(1) : setCurrentPage(currentPage - 1);
    }
    if (btn === "next") {
      currentPage === 5 ? setCurrentPage(5) : setCurrentPage(currentPage + 1);
    }
  };

  const addImage = (image ) => {
      dispatch(addElement({type : "img" , img : image.urls.raw , name : image.id}))
  }

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="h-[93.2vh] overflow-auto w-[20vw]">
      <div className="flex flex-col ">
        <input
          className="bg-inherit text-sky-50 border-stone-500  border-[1px] py-1 "
          type="text"
          placeholder="Search images"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="bg-sky-500 text-black py-1 hover:bg-sky-300" onClick={searchImages}>
          Search
        </button>
      </div>
      <div className="flex flex-wrap w-[18vw] h-[90vh] mt-4 object-contain">
        {currentImages &&
          currentImages.map((image) => (
            <img
              className="w-[50%] "
              key={image.id}
              src={image.urls.raw}
              alt={image.alt_description}
              loading="lazy"
              onClick={() => addImage(image)}
            />
          ))}
      </div>
      <div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="rounded-full border-[1px] bg-white p-[1px] hover:bg-slate-400 border-black"
          onClick={() => changePage("prev")}
        >
          <svg
            class="block w-4 h-4 fill-black"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
            fill="black"
          >
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
          </svg>
        </button>
        <button>{currentPage}</button>
        <button
          className="rounded-full border-[1px] bg-white p-[1px] hover:bg-slate-400 border-black"
          onClick={() => changePage("next")}
        >
          <svg
            class="block w-4 h-4 fill-black"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
            fill="black"
          >
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
          </svg>
        </button>
      </div>
      </div>
      
      {/* <Pagination
        itemsPerPage={imagesPerPage}
        totalItems={images.length}
        paginate={paginate}
      /> */}
    </div>
  );
}

export default SidebarImages;
