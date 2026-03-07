import React from 'react'
import Logo from './Logo'

const NavBar = () => {
  return (
    <nav>
        {/* large screen */}
        <div className='lg:flex hidden'>
            <Logo/>
        </div>
    </nav>
  )
}

export default NavBar