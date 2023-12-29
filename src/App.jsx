import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUserData(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = () => {
    fetchUserData();
    changeBackgroundColor();
  };

  const changeBackgroundColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBackgroundColor(randomColor);
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="user-container">
        <h1>Random User Generator</h1>
        <button onClick={handleRefresh}>Refresh</button>
        {userData && (
          <>
            <div>
              <strong>Name:</strong> {userData.name}
            </div>
            <div>
              <strong>Email:</strong> {userData.email}
            </div>
            {/* Add more user details as needed */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

