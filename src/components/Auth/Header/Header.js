import React from 'react'
import './Header.scss';
import Logo from '../../../Assets/Images/logo.webp';
export default function Header() {
    return (
        <>
            <div className="mini-header">
                <div className="container-fluid">
                    <div className="mini-header-alignment">
                        <div className="language-alignment">
                            <p>EN <span>| ES</span></p>
                        </div>
                        <div className="buy-now-button">
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>   
            <header>
                <div className="container-fluid">
                    <div className="header-alignment">
                        <div className="company_logo">
                            <img src={Logo} alt="Logo"/>    
                        </div>    
                        <div className="sub-menu">
                            <nav>
                                <ul>
                                    <li>Products</li>    
                                    <li>Flavorful Experiences</li>    
                                    <li>Rewards</li>    
                                    <li>Where to buy</li>    
                                    <li>Our Story</li>    
                                </ul>    
                            </nav>    
                        </div>    
                    </div>    
                </div>    
            </header>            
        </>
    )
}
