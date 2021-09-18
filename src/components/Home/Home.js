import React, { useState } from 'react'
import '../Home/home.scss';
import TextImage from '../../Assets/Images/new-sparkle-logo-align.svg';
import SparkleStory from './SparkleStory/SparkleStory';
import SparkleGallery from './SparkleGallery/SparkleGallery';
import SparkleRewards from './SparkleRewards/SparkleRewards';
export default function Home() {
    const [showForm, setShowForm] = useState(true);

    return (
        <>
            <div className="home-banner">
                <div className="container">
                    <div className="banner-text">
                        {/* <h1>SHARE YOUR</h1> */}
                        <div className="text-img-align">
                            <img src={TextImage} alt="TextImage" />
                        </div>
                        <div className="text-img-align">
                            <div className="text-img-align-span">
                                <span>
                                    Why do you love Sparkling Ice? Has it helped you lose
                                    weight, helped kick your soda habit, or do you just love how
                                    it tastes and makes you feel? There are a million reasons to
                                    love Sparkling Ice and we want to hear your story of
                                    how Sparkling Ice makes you sparkle brighter.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <SparkleStory showForm={showForm} setShowForm={setShowForm}/>
            </>
            <>
                <SparkleGallery showForm={showForm} setShowForm={setShowForm}/>
            </>
            <>
                <SparkleRewards />
            </>
        </>
    )
}
