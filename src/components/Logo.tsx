import React from 'react'
import Github_Logo from "../image/github-logo.png"

function Logo() {
  return (
    <div>
        <img src={Github_Logo} alt="" className="w-56 h-56 object-cover opacity-70 m-3" />
    </div>
  )
}

export default Logo