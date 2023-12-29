import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
const App = () => {
 const [userData, setUserData] = useState(null);
 const [bgColor, setBgColor] = useState('white');

 const fetchRandomUser = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    // Assuming the response.data is an array of users, choose a random user
    const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
    setUserData(randomUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
 };

 useEffect(() => {
    fetchRandomUser();
    generateRandomColor();
 }, []);

 const handleRefresh = () => {
    fetchRandomUser();
    generateRandomColor();
 };

 return (
<div className='container-box'>
<div className='container'>
        <div style={{ backgroundColor: bgColor}} className='box'>
          {userData ? (
            <div className='inner-box'>
              <div className='header-div'>
                <h1>Random User Generator</h1>
                </div>

              <div>
              <img src={userData.image} alt="" />
              
           <div className='details-div' style={{textAlign:'justify'}}>
                <strong>Name:</strong> {userData.firstName} {userData.lastName} , <strong>age</strong>:{userData.age}<br />
                <strong>Email:</strong> {userData.email} <br />
                <strong>Phone:</strong>{userData.phone} <br />
                <strong>Address:</strong>{userData.address.address},{userData.address.city}

           </div>          
               </div>
              <div className='btn-div'>
                <button onClick={handleRefresh}>
                  Get New user
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
       </div>
</div>
</div>
 );
};

export default App;