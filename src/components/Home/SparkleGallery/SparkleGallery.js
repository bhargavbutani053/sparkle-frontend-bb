import React, { useEffect, useState } from "react";
import "./SparkleGallery.scss";
import GalleryText from "../../../Assets/Images/gallery-text.png";
// import GalleryPurple from "../../../Assets/Images/gallery-story-logo-purple.png";
// import GalleryPurple from "../../../Assets/Images/sparkle-stories-logo.png";
import GalleryPurple from "../../../Assets/Images/sparkle-stories-logo2.svg";
import ModalImages from "../../../Assets/Images/modal-img.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { useRef } from "react";
import Posterimg from "../../../Assets/Images/TR_SI_Cube-Thumbnails-CP-1.png";
import ReactTooltip from "react-tooltip";
import posterimg from "../../../Assets/Images/TR_SI_Cube-Thumbnails-CP-1.png";





export default function SparkleGallery(props) {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [len, setLen] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isvideoopen, setIsvideoOpen] = useState(false);
  const [initials, setInitials] = useState();
  const [hover, setHover] = useState(false);
  const [curIndex, setCurIndex] = useState();
  const [noimage, setNoimage] = useState();
  const [fileType, setFileType] = useState();
  const [newinsta, setNewinsta] = useState(false);
  const [defaultimages, setdefaultimages] = useState([
    "https://7cmg-objects.s3.us-east-2.amazonaws.com/story/assets/TR_SI_Cube-Thumbnails-BC-1.png",
  ]);

  const [defaultoneimages, setdefaultoneimages] = useState([
    "https://7cmg-objects.s3.us-east-2.amazonaws.com/story/assets/TR_SI_Cube-Thumbnails-BR-1.png",
  ]);

  const [defaulttwoimages, setdefaulttwoimages] = useState([
    "https://7cmg-objects.s3.us-east-2.amazonaws.com/story/assets/TR_SI_Cube-Thumbnails-CP-1.png",
  ]);

  const [defaultthreeimages, setdefaultthreeimages] = useState([
    "https://7cmg-objects.s3.us-east-2.amazonaws.com/story/assets/TR_SI_Cube-Thumbnails-GF-1.png",
  ]);

  const [defaultfourimages, setdefaultfourimages] = useState([
    "https://7cmg-objects.s3.us-east-2.amazonaws.com/story/assets/TR_SI_Cube-Thumbnails-LMN-1.png",
  ]);


const useOutsideAlerter = (ref) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setIsModalOpen(false);
               document.body.classList.remove("body-overflow");
            }
        }
  
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }


  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const getImages = async (i) => {
    await ApiGet(`story/getstory?page=${i || 1}`)
      .then((res) => {
        setImages(res.data.data.stories);
        setLen(res.data.data.totalPage);
        console.log("vijay", res.data.data.stories);
        // setInline(res.data.data)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getImages();
    console.log("defaultimages", defaultimages);
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
    console.log("initials", initials);
  }, [initials]);

  useEffect(() => {
    console.log("int", images);
  });

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
  const handleModalOpen = (index, image) => {
    setIsModalOpen(true);
    document.body.classList.add("body-overflow");
    if(images[index]?.type === "image"){
      setFileType("image");
    } else if(images[index]?.type === "video"){
      setFileType("video");
    } else if(images[index]?.type === "defaultImage"){
      setFileType("defaultImage")
    }
    setCurIndex(index);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewinsta(false);
    setIsvideoOpen(false);
    document.body.classList.remove("body-overflow");
  };

  const handclose = () => {
    setIsvideoOpen(false);
    setIsModalOpen(false);
    setNewinsta(false);
    document.body.classList.remove("body-overflow");
  };

  const handleNext = () => {
    if(images[curIndex]?.type === "image"){
      setFileType("image");
    } else if(images[curIndex]?.type === "video"){
      setFileType("video");
    } else if(images[curIndex]?.type === "defaultImage"){
      setFileType("defaultImage")
    }
    setCurIndex(curIndex < images?.length - 1 ? curIndex + 1 : curIndex);
  };

  const handlePrev = () => {
    if(images[curIndex]?.type === "image"){
      setFileType("image");
    } else if(images[curIndex]?.type === "video"){
      setFileType("video");
    } else if(images[curIndex]?.type === "defaultImage"){
      setFileType("defaultImage")
    }
    setCurIndex(curIndex > 0 ? curIndex - 1 : curIndex);
  };

  const handleHover = (rec) => {
    if (!isModalOpen) {
      setInitials(rec?.firstname + rec?.lastname);
    } else {
      setInitials();
    }
  };

  const handleOut = () => {
    setInitials();
  };

  const checkImageFormat = () => {
    if(images[curIndex]?.image.includes(".png") && images[curIndex]?.image.includes(".jpg") && images[curIndex]?.image.includes(".jpeg") && images[curIndex]?.image.includes(".jfif")){
      return true;
    } else{
      return false;
    }
  }
  console.log("fikleType", fileType);

  return (
    <div>
      <div className={isModalOpen && `opacity-modal`}></div>
      {isModalOpen && (
        <div className="modal">
          <div className={`modal-relative ${images[curIndex]?.type === "defaultImage" && "text-modal-width-full"}` } ref={wrapperRef}>
          {/* <div className={"modal-relative"}> */}

            {curIndex !== 0 && (
              <div
                className="next-button-alignment-top"
                onClick={() => handlePrev()}
                
              >
                <img src={require("../../../Assets/Images/Left.png").default}  />
              </div>
            )}

            {curIndex !== images.length - 1 && (
              <div
                className="next-button-alignment"
                onClick={() => handleNext()}
               
              >
                <img
                  src={require("../../../Assets/Images/Right.png").default } 
                />{" "}
              </div>
            )}
            <div className="modal-body">
              <div className={`modal-grid ${images[curIndex]?.type === "defaultImage" && "text-modal-grid-full"}`}>
              {/* <div className={"modal-grid"}> */}

                <div className="modal-grid-items">
                  <div
                    className="mobile-view-close"
                    onClick={() => handleModalClose()}
                  >
                    <span>X</span>
                  </div>
                
                  <div
                    className={`modal-main-img ${images[curIndex]?.type === "defaultImage" && "image-no-show-class"}`}
                    // className={"modal-main-img "}
                  >
                    {(()=>{
                      if(images[curIndex]?.type === "image"){
                        console.log("in image")
                        return <img src={images[curIndex]?.image} alt="ModalImages" />
                      } else if(images[curIndex]?.type === "video"){
                        console.log("in video")
                         return <video
                        src={images[curIndex]?.image}
                        poster={Posterimg}
                        alt="ModalVideo"
                        height="400px"
                        wdith="700px"
                        controls
                      />
                      } else {
                        console.log("in null")
                        return null;
                      }
                    }
                    )()}
                  </div>
                
                  </div>

                <div className="modal-grid-items">
                  <div
                   
                    className = {`${images[curIndex]?.type === "defaultImage" ? ("close-icon-addone") : ("close-icon-add")}`}
                    onClick={() => handleModalClose()}
                  >
                    <p id="close-icon-id" className = {`${images[curIndex]?.type === "defaultImage" &&"clonebutton"}`} >X</p>
                  </div>

                  <div className="modal-text-style">
                    <div className={`sparkle-img-center ${images[curIndex]?.type === "defaultImage" &&"storycenter"}`}>
                      <img
                        src={GalleryPurple}
                        alt="GalleryText"
                        style={{ marginBottom: "10px", height: "55px" }}
                      />
                    </div>
                    <div className={`${images[curIndex]?.type === "defaultImage" &&"text-modal-body"}`}>

                    <p style={{ marginTop: "10px" }}>
                      {images[curIndex]?.story}
                    </p>
                    </div>

                    <div className={`${images[curIndex]?.type === "defaultImage" &&"text-modal-body"}`}>
                    <p>
                      {"- " + images[curIndex]?.firstname + " "}
                      {images[curIndex]?.lastname === "null"
                        ? ""
                        : images[curIndex]?.lastname}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* video image */}
      <div className="sparkle-gallery-banner">
        <div className="container">
          <div className="gallery-img-align">
            <img src={GalleryText} alt="GalleryText" />
          </div>
          <div className="box-grid">
            {images &&
              images?.map((rec, index) => {
                console.log({ rec });
                return (
                  <div
                    key={index}
                    className="box-grid-items"
                    onClick={() => handleModalOpen(index, rec.image)}
                    onMouseOver={() => handleHover(rec)}
                    onMouseOut={() => handleOut()}
                  >
                    {/* {rec.image !== null &&
                    rec.image.includes(".png" || ".jpg" || ".jpeg") ? (
                      <>
                        <img
                          // data-tip={initials}
                          data-for="foo"
                          src={rec.image}
                          alt="ModalImages"
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <video
                          src={rec?.image}
                          poster={Posterimg}
                          alt="ModalVideo"
                          height="500px"
                          wdith="300px"
                        />
                      </>
                    )} */}
                   
                   {rec.type === "defaultImage" && (
                                <img
                                 src={rec.image}
                                 alt="cardVideo"
                               />
                             ) 
                             }
                             {rec.type === "image" && (
                              <img
                               src={rec.image}
                               alt="cardVideo"
                             />
                           ) 
                           }
                           {rec.type === "video" && (
                            <video
                             src={rec.image}
                             
                             alt="cardVideo"
                           />
                         ) 
                         }


                    <div className="box-grid-black">
                      <div className="text-style">
                        <p>Submitted By</p>
                        <h2>
                          {rec?.firstname}{" "}
                          {rec?.lastname !== "null" &&
                          rec?.lastname !== "undefined"
                            ? rec?.lastname
                            : ""}
                          {console.log("rec?.lastname", rec?.lastname)}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <p data-tip={initials}>hi</p> */}
          <ReactTooltip id="foo" />
          <div className="pagination">
            {(() => {
              let pages = [];
              for (let i = 1; i <= len && i <= 6; i++) {
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
            <a href="#formBar" onClick={()=> props.setShowForm(true)} >
              <p>Share Your Sparkle Story</p>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
