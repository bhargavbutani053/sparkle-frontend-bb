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
                        And win a year’s supply <br/>
of Sparkling Ice!
                        </p>
                        <span>
                        Why do you love Sparkling Ice? Has it helped you lose weight, helped kick your soda habit, or do you just love how it tastes and makes you feel? There are a million reasons to love Sparkling Ice and we want to hear your story of 
                        </span>
                        <span>how Sparkling Ice makes you sparkle brighter</span>
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
