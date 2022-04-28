import logo from './images/logo.png';
import './navBar.css';
import {FaTimes, FaBars} from 'react-icons/fa'
import { useState, useEffect } from 'react';
import React from 'react';

// pls insert the of each folder

const NavBar = () => {
  // {click ? "nav-items-active" : "nav-items"}
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)

  const usefulLink = {
    deGeLink: '/',
    timetablePlannerLink: 'http://localhost:3001/',
    matchingLink: '',
    gpacalLink: '/gpacal',
    forumLink: ''
  }

  useEffect(() => {
    if(click){
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }
  });

  
  return (
  <div className="nav-container">
    <div className="wrapper">
      <nav>
        <div className="logo">
          <img src={logo} alt="CC info logo"/>
        </div>
        <ul className="nav-items-active" id={click ? "show" : "" } >
          <li>
            <a href={usefulLink.deGeLink} className="a-to-other-page">DS/GE 科目指南</a>
          </li>
          <li>
            <a href={usefulLink.timetablePlannerLink} className="a-to-other-page">時間表計劃工具</a>
          </li>
          <li>
            <a href={usefulLink.matchingLink} className="a-to-other-page">科目匹配系統</a>
          </li>
          <li>
            <a href={usefulLink.gpacalLink} className="a-to-other-page">GPA 計算器</a>
          </li>
          <li>
            <a href={usefulLink.forumLink} className="a-to-other-page">論壇</a>
          </li>
        </ul>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes size={30}/> : <FaBars size={30}/>}
        </div>
      </nav>
    </div>
  </div>
  )
}

export default NavBar;