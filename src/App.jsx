import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const MyComponent = () => {
  const [data, setData] = useState(null);
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && data.users.map((user) => (
      <div key={user.id}>
        <h2>{user.firstName} {user.lastName}</h2>
        <h4>Age: {user.age} | Height: {user.height} | Hair Colour: {user.hair.color}</h4>
      </div>
    ))}
    </div>
  );
};

export default MyComponent;
