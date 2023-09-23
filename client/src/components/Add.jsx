import axios from "axios";
import React from "react";
import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'; 

const Add = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });


    const naviagate = useNavigate()


    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    console.log(book)

     const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8000/books", book)
            naviagate("/")
            
        } catch(err){
            console.log(err)
        }
    }


    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input typ="text" placeholder="title" onChange={handleChange} name="title"/>
            <input typ="text" placeholder="desc" onChange={handleChange} name="desc"/>
            <input typ="number" placeholder="price" onChange={handleChange} name="price"/>
            <input typ="text" placeholder="cover" onChange={handleChange} name="cover"/>
        
       <button onClick={handleClick}> Add</button>
        </div>
    )
}

export default Add