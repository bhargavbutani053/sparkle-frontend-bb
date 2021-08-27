import React from 'react'
import './SparkleRewards.scss';
import productImage from '../../../Assets/Images/product.png';
export default function SparkleRewards() {
    return (
        <>
            <div className="sparkle-reward-banner">
                <div className="container">
                    <div className="reward-text">
                        <h2>GET MORE WITH </h2>
                        <h1>SPARKLING ICE®<br/> REWARDS</h1>
                        <div className="join-now-button">
                            <button>JOIN NOW</button>
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
