import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector((store) => store.user)
  return (
    <>
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">👋IshqRaah</a>
            </div>
            {user && <div className="flex gap-1">
                <p className='items-center flex font-medium text-xl'>Welcome, vikram</p>
                <div className="dropdown dropdown-end mr-5 ml-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="user photo"
                          src= {user.photoUrl} />
                      </div>
                    </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
            </div>}
        </div>
    </>
  )
}

export default NavBar
