import React from 'react'
import './Sidebar.css'
import homeIcon from '../../assets/home-icon.svg'
import shortsIcon from '../../assets/shorts-icon.svg'
import subscriptionsIcon from '../../assets/subscriptions-icon.svg'
import historyIcon from '../../assets/history-icon.svg'
import playlistIcon from '../../assets/playlist-icon.svg'
import yourvideosIcon from '../../assets/your-videos-icon.svg'
import watchLaterIcon from '../../assets/watch-later-icon.svg'
import likeIcon from '../../assets/like-icon.svg'
import trendingIcon from '../../assets/trending-icon.svg'
import shoppingIcon from '../../assets/shopping-icon.svg'
import musicIcon from '../../assets/music-icon.svg'
import filmsIcon from '../../assets/films-icon.svg'
import liveIcon from '../../assets/live-icon.svg'
import gamingIcon from '../../assets/gaming-icon.svg'
import newsIcon from '../../assets/news-icon.svg'
import sportsIcon from '../../assets/sports-icon.svg'
import coursesIcon from '../../assets/courses-icon.svg'
import fashionIcon from '../../assets/fashion-icon.svg'
import podcastsIcon from '../../assets/podcasts-icon.svg'
import settingsIcon from '../../assets/settings-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'

const Sidebar = ({sidebar}) => {
    return (
        <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
            <div className="side-basic">
                <div className='side-link'>
                    <img src={homeIcon} alt="Home" /><p>Home</p>
                </div>
                <div className='side-link'>
                    <img src={shortsIcon} alt="Shorts" /><p>Shorts</p>
                </div>
                <div className='side-link'>
                    <img src={subscriptionsIcon} alt="Subscriptions" /><p>Subscriptions</p>
                </div>
            </div>
            <hr />
            <div className="side-you">
                <h3>You</h3>
                <div className='side-link'>
                    <img src={historyIcon} alt="History" /><p>History</p>
                </div>
                <div className='side-link'>
                    <img src={playlistIcon} alt="Playlists" /><p>Playlists</p>
                </div>
                <div className='side-link'>
                    <img src={yourvideosIcon} alt="Your Videos" /><p>Your Videos</p>
                </div>
                <div className='side-link'>
                    <img src={watchLaterIcon} alt="Watch Later" /><p>Watch Later</p>
                </div>
                <div className='side-link'>
                    <img src={likeIcon} alt="Liked Videos" /><p>Liked Videos</p>
                </div>
            </div>
            <hr />
            <div className="side-subscribed">
                <h3>Subscriptions</h3>
                <div className='side-link'>
                    <img src={profileIcon} alt="Channel 1" /><p>Channel 1</p>
                </div>
                <div className='side-link'>
                    <img src={profileIcon} alt="Channel 2" /><p>Channel 2</p>
                </div>
                <div className='side-link'>
                    <img src={profileIcon} alt="Channel 3" /><p>Channel 3</p>
                </div>
                <div className='side-link'>
                    <img src={profileIcon} alt="Channel 4" /><p>Channel 4</p>
                </div>
            </div>
            <hr />
            <div className="side-explore">
                <div className='side-link'>
                    <img src={trendingIcon} alt="Trending" /><p>Trending</p>
                </div>
                <div className='side-link'>
                    <img src={shoppingIcon} alt="Shopping" /><p>Shopping</p>
                </div>
                <div className='side-link'>
                    <img src={musicIcon} alt="Music" /><p>Music</p>
                </div>
                <div className='side-link'>
                    <img src={filmsIcon} alt="Films" /><p>Films</p>
                </div>
                <div className='side-link'>
                    <img src={liveIcon} alt="Live" /><p>Live</p>
                </div>
                <div className='side-link'>
                    <img src={gamingIcon} alt="Gaming" /><p>Gaming</p>
                </div>
                <div className='side-link'>
                    <img src={newsIcon} alt="News" /><p>News</p>
                </div>
                <div className='side-link'>
                    <img src={sportsIcon} alt="Sports" /><p>Sports</p>
                </div>
                <div className='side-link'>
                    <img src={coursesIcon} alt="Courses" /><p>Courses</p>
                </div>
                <div className='side-link'>
                    <img src={fashionIcon} alt="Fashion and Beauty" /><p>Fashion and Beauty</p>
                </div>
                <div className='side-link'>
                    <img src={podcastsIcon} alt="Podcasts" /><p>Podcasts</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Sidebar