import React from 'react'
import './Footer.scss';
import FooterImage from '../../../Assets/Images/footer.png';
export default function Footer() {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-grid-items">
                            <img src={FooterImage} alt="FooterImage"/>
                        </div>
                        <div className="footer-grid-items">
                            <nav>
                                <ul>
                                    <li>FAQs</li>
                                    <li>Where to Buy</li>
                                    <li>Visit Sparkling Ice</li>
                                </ul>
                            </nav>
                        </div>
                        <div className="footer-grid-items">
                             <nav>
                                <ul>
                                    <li>Terms and Conditions</li>
                                    <li>Privacy Policy </li>
                                    <li>Customer Support</li>
                                </ul>
                            </nav>
                        </div>
                    </div>  
                    <div className="footer-child-text">
                        <p>
                            The Sparkling Ice Rewards Loyalty Program is open only to legal residents of the 50 US/DC
                            who are 18 years of age ( 19 in AL & NE; 21 in MS ) or older. starts at 12:00 PM ET
                            on 4/1/21 and ends at 15:59:59 AM ET on 9/30/2021. Limited quantity of rewards avilable 
                            while supplies last.<a>Click here</a> for full terms and Conditions. Void where prohibited 
                            Sponsor: Talking Rain Beverage Company, Inc., 30520 SE 84th St, Preston, WA 98050.
                            <span>Sponsor reserves the right to change or discontinue this program at any 
                                program at anytime. Talking Rain Beverage Company, Inc. Sparkling Ice is a 
                                registered trademark of Talking Rain. 
                            </span>
                        </p>    
                    </div>          
                </div>    
            </footer>   
        </>
    )
}
