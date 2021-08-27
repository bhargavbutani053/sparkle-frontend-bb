import React from 'react'
import '../Home/home.scss';
import TextImage from '../../Assets/Images/text.png';
import SparkleStory from './SparkleStory/SparkleStory';
import SparkleGallery from './SparkleGallery/SparkleGallery';
import SparkleRewards from './SparkleRewards/SparkleRewards';
export default function Home() {
    return (
        <>
            <div className="home-banner">
                <div className="container">
                    <div className="banner-text">
                        <h1>SHARE YOUR</h1>
                        <div className="text-img-align">
                            <img src={TextImage} alt="TextImage"/>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis neque 
                            at orci vestibulum vehicula et ac elit. Vivamus velit nibh, ornare id urna id, interdum volutpat eros.
                        </p>
                        <p>
                            Donec varius quam elit, aliquam efficitur libero hendrerit non. Vestibulum ante ipsum primis 
                            in faucibus orci luctus et ultrices posuere cubilia curae; Donec rhoncus erat at lorem.
                        </p>
                    </div>
                </div>
            </div>
            <>
                <SparkleStory/>
            </>
            <>
                <SparkleGallery/>
            </>
            <>
                <SparkleRewards/>
            </>
        </>
    )
}
