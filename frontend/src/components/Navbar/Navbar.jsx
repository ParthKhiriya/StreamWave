import React from 'react'
import './Navbar.css'
import fullLogo from '../../assets/full-logo.svg'
import menuIcon from '../../assets/menu-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import plusIcon from '../../assets/plus-icon.png'
import notificationIcon from '../../assets/notification-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import voiceIcon from '../../assets/voice-icon.svg'

const Navbar = ({setSidebar}) => {
    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img className='menu-icon' onClick={() => {setSidebar(prev => prev===false?true:false)}} src={menuIcon} alt="Menu Icon" />
                <img className='logo' src={fullLogo} alt="Logo" />
            </div>

            <div className='nav-middle flex-div'>
                <div className='search-box flex-div'>
                    <input type='text' placeholder='Search' />
                    <img src={searchIcon} alt="Search Icon" />
                </div>
                <div className='voice-box flex-div'>
                    <img src={voiceIcon} alt="Voice Icon" />
                </div>
                
            </div>

            <div className='nav-right flex-div'>
                <img src={plusIcon} alt="Create Icon" />
                {/* <img src="" alt="More Icon" /> */}
                <img src={notificationIcon} alt="Notificaton Icon" />
                <img className='profile-icon' src={profileIcon} alt="Profile Icon" />
            </div>
        </nav>
    )
}

export default Navbar