import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { About } from './pages'
import { UserForm } from './components';
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { NavBar } from './components'

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <div className='gradient__bg'>
                    <NavBar />
                    <ToastContainer postition="top-center"></ToastContainer>
                </div>
                <Routes>
                    <Route path="/AddUser" element={<UserForm />}></Route>
                    <Route path="/About" element={<About />}></Route>
                </Routes>
                {/* <div>
                    <Footer />
                </div> */}
            </div>
        </BrowserRouter>
    )
}

export default App