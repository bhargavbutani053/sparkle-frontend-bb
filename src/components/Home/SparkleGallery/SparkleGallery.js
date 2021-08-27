import React, { useEffect, useState } from 'react'
import './SparkleGallery.scss';
import GalleryText from '../../../Assets/Images/gallery-text.png';
import ModalImages from '../../../Assets/Images/modal-img.png';
import { ApiGet } from '../../Helpers/Api/ApiData';
export default function SparkleGallery() {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [len, setLen] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelData, setModelData] = useState();
    const [curIndex, setCurIndex] = useState();
    const getImages = async (i) => {
        await ApiGet(`story/getstory?page=${i || 1}`).then((res) => {
            setImages(res.data.data.stories);
            setLen(res.data.data.totalPage);
        }).catch((err) => {
            console.log("err", err)
        });
    }
    useEffect(() => {
        getImages();
    }, []);

    const handlePagination = (i) => {
        setPageNumber(i);
        getImages(i);
    }
    const handleModalOpen = (index) =>{
        setIsModalOpen(true);
        document.body.classList.add('body-overflow');
        setCurIndex(index);
    }
    const handleModalClose = () =>{
        setIsModalOpen(false);
        document.body.classList.remove('body-overflow');
    }

    console.log("currentIndex", curIndex);

    const handleNext = () => {
        setCurIndex(curIndex < images?.length - 1  ? curIndex + 1 : curIndex);
    }

    const handlePrev = () => {
        setCurIndex(curIndex > 0 ? curIndex - 1 : curIndex);
    }

    return (
        <div>
            {isModalOpen &&(
                <div className="modal">
                    <div className="modal-relative">
                    <div className="next-button-alignment-top" onClick={() => handlePrev()}>
                        <img src={require("../../../Assets/Images/angle-left-solid.svg").default}/>
                    </div>
                    <div className="next-button-alignment" onClick={() => handleNext()} >
                    <img src={require("../../../Assets/Images/angle-right-solid.svg").default} />
                    </div>
                    <div className="modal-body">
                        <div className="modal-grid">
                           
                            <div className="modal-grid-items">
                                <div className="modal-main-img">
                                    <img src={images[curIndex]?.image} alt="ModalImages"/>
                                </div>
                            </div>
                          
                            <div className="modal-grid-items">
                                <div className="close-icon-add" onClick={() => handleModalClose()}>
                                    <p>Close</p>    
                                </div>
                                <div className="modal-text-style">
                                    <p>
                                       {
                                           images[curIndex]?.story
                                       }
                                    </p>
                                    <p>- {images[curIndex]?.firstname + " " + images[curIndex]?.lastname}</p>
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
                        {
                            images && images?.map((rec, index) => {
                                return (
                                    <div key={index} className="box-grid-items" onClick={() => handleModalOpen(index)}>
                                        <img src={rec?.image} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pagination">
                        {(() => {
                            let pages = [];
                            for (let i = 1; i <= len; i++) {
                                pages.push(<div className={`pagination-button ${pageNumber === i  && "pagination-active"}`} onClick={() => handlePagination(i)}></div>)
                            }
                            return pages;
                        })()}
                    </div>
                    <div className="share-story">
                        <p>Share Your Sparkle Story</p>
                    </div>
                </div>
            </div>
        </div>
    )
}