import React, { useEffect, useState } from "react";
import "./SparkleGallery.scss";
import GalleryText from "../../../Assets/Images/gallery-text.png";
import ModalImages from "../../../Assets/Images/modal-img.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { useRef } from "react";
import ReactTooltip from 'react-tooltip';

export default function SparkleGallery() {
  const wrapperRef = useRef(null);
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [len, setLen] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initials, setInitials] = useState();
  const [hover, setHover] = useState(false);
  const [curIndex, setCurIndex] = useState();
  const getImages = async (i) => {
    await ApiGet(`story/getstory?page=${i || 1}`)
      .then((res) => {
        setImages(res.data.data.stories);
        setLen(res.data.data.totalPage);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [initials]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         // handleModalClose();
//         return null;
//       } else {
//         handleModalClose();
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [wrapperRef]);

  const handlePagination = (i) => {
    setPageNumber(i);
    getImages(i);
  };
  const handleModalOpen = (index) => {
    setIsModalOpen(true);
    document.body.classList.add("body-overflow");
    setCurIndex(index);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove("body-overflow");
  };


  const handleNext = () => {
    setCurIndex(curIndex < images?.length - 1 ? curIndex + 1 : curIndex);
  };

  const handlePrev = () => {
    setCurIndex(curIndex > 0 ? curIndex - 1 : curIndex);
  };

  const handleHover = (rec) => {
      if(!isModalOpen){
          setInitials(
            rec.firstname.charAt(0).toUpperCase() +
              rec.lastname.charAt(0).toUpperCase()
          );
      } else {
          setInitials();
      }
  };

  const handleOut = () => {
      setInitials();
  }


  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-relative">
            {curIndex !== 0 && (
              <div
                className="next-button-alignment-top"
                onClick={() => handlePrev()}
              >
                <img
                  src={
                    require("../../../Assets/Images/angle-left-solid.svg")
                      .default
                  }
                />
              </div>
            )}

            {curIndex !== images.length - 1 && (
              <div
                className="next-button-alignment"
                onClick={() => handleNext()}
              >
                <img
                  src={
                    require("../../../Assets/Images/angle-right-solid.svg")
                      .default
                  }
                />{" "}
              </div>
            )}
            {/* <img src={require("../../../Assets/Images/angle-right-solid.svg").default} /> */}
            <div className="modal-body" ref={wrapperRef}>
              <div className="modal-grid">
                <div className="modal-grid-items">
                    <div className="mobile-view-close" onClick={() => handleModalClose()}>
                        <span>X</span>
                    </div>
                  <div className="modal-main-img">
                    {images &&
                    images[curIndex]?.image.includes(
                      ".png" || ".jpg" || ".jpeg"
                    ) ? (
                      <img src={images[curIndex]?.image} alt="ModalImages" />
                    ) : (
                      <video
                        src={images[curIndex]?.image}
                        alt="ModalVideo"
                        controls
                      />
                    )}
                  </div>
                </div>

                <div className="modal-grid-items">
                  <div
                    className="close-icon-add"
                    onClick={() => handleModalClose()}
                  >
                    <p>X</p>
                  </div>
                  <div className="modal-text-style">
                    <p>{images[curIndex]?.story}</p>
                    <p>
                      {images[curIndex]?.firstname +
                        " " +
                        images[curIndex]?.lastname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="sparkle-gallery-banner">
        <div className="container">
          <div className="gallery-img-align">
            <img src={GalleryText} alt="GalleryText" />
          </div>
          <div className="box-grid">
            {images &&
              images?.map((rec, index) => {
                return (
                  <div
                    key={index}
                    className="box-grid-items"
                    onClick={() => handleModalOpen(index)}
                    onMouseOver={() => handleHover(rec)}
                    onMouseOut={() => handleOut()}
                  >
                    {rec.image.includes(".png" || ".jpg" || ".jpeg") ? (
                      <img data-tip={initials} data-for="foo" src={rec.image} alt="ModalImages" />
                    ) : (
                      <video data-tip={initials} data-for="foo" src={rec.image} alt="ModalVideo" />
                    )}
                  </div>
                );
              })}
          </div>
          {/* <p data-tip={initials}>hi</p> */}
            <ReactTooltip id="foo"/>
          <div className="pagination">
            {(() => {
              let pages = [];
              for (let i = 1; i <= len && i <= 5; i++) {
                pages.push(
                  <div
                    className={`pagination-button ${
                      pageNumber === i && "pagination-active"
                    }`}
                    onClick={() => handlePagination(i)}
                  ></div>
                );
              }
              return pages;
            })()}
          </div>
          <div className="share-story">
              <a href="#formBar">
            <p>Share Your Sparkle Story</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
