import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home, AddOperator, ViewUser, ViewOperator, Operator, About, Search } from './pages'
import { UserForm } from './components';
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { NavBar, Footer } from './components'

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <div className='gradient__bg'>
                    <NavBar />
                    <ToastContainer postition="top-center"></ToastContainer>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path="/adduser" element={<UserForm />}></Route>
                    <Route path="/addOperator" element={<AddOperator />}></Route>
                    <Route path="/operator" element={<Operator />}></Route>
                    <Route path="/updateuser/:id" element={<UserForm />}></Route>
                    <Route path="/viewuser/:id" element={<ViewUser />}></Route>
                    <Route path="/viewoperator/:id" element={<ViewOperator />}></Route>
                    <Route path="/updateoperator/:id" element={<AddOperator />}></Route>
                    <Route path="/aboutus" element={<About />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                </Routes>
                {/* <div>
                    <Footer />
                </div> */}
            </div>
        </BrowserRouter>
    )
}

export default App