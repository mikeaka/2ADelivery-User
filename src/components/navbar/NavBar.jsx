import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../img/logo6.png'
import './navbar.css'

const Menu = () => (
    <>
        <p><a href="/">Acceuil</a></p>
        <p><a href="/operator">Opérateurs</a></p>
        <p><a href="/adduser">Ajout Utilisateur</a></p>
        <p><a href="/addoperator">Ajout Opérateur</a></p>
        <p><a href="/aboutus">L'entreprise</a></p>
    </>
)

const NavBar = () => {
    const [toogleMenu, setToogleMenu] = useState(false)


    return (
        <div className='geo__navbar'>
            <div className="geo__navbar-links">
                <div className="geo__navbar-links_logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="geo__navbar-links_container">
                <Menu />
            </div>
            <div className="geo__navbar-menu">
                {toogleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToogleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToogleMenu(true)} />
                }
                {toogleMenu && (
                    <div className="geo__navbar-menu_container scale-up-center">
                        <div className="geo__navbar-menu_container-links">
                            <Menu />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar