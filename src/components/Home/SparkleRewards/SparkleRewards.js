import React from 'react'
import './SparkleRewards.scss';
import productImage from '../../../Assets/Images/full-img-5.png';
export default function SparkleRewards() {
    return (
        <>
            <div className="sparkle-reward-banner">
                <div className="container">
                    <div className="reward-text">
                        <h2>GET MORE WITH </h2>
                        <h1>SPARKLING ICE<span>®</span><br/> REWARDS</h1>
                        <div className="join-now-button">
                           <a href="https://bit.ly/SIRewards" target="_blank" className="join-ga"><button className="join">JOIN NOW</button></a>
                        </div>
                    </div>
                </div>
                <div className="product-img">
                    <img src={productImage} alt="productImage"/>
                </div>
            </div>   
        </>
    )
}
