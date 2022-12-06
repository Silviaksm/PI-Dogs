import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className='containerLanding'>
      <p>Welcome!</p>
      <Link to="/home">
        <button>Start</button>
      </Link>
    </div>
  )
}