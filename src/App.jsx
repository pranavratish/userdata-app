import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateAverageAge = () => {
    if (data && data.users.length > 0) {
      const totalAge = data.users.reduce((accumulator, user) => accumulator + user.age, 0);
      return Math.round(totalAge / data.users.length); }
      return 0;
    };

  const calculateHighestHeight = () => {
    if (data && data.users.length > 0) {
      const highestHeight = data.users.reduce((accumulator, user) => Math.max(accumulator, user.height), 0);
      return highestHeight; }
    return 0;
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <h1>User Data</h1>
    <div>
        <h2>Average Age : {calculateAverageAge()} | Highest Height : {calculateHighestHeight()} | Total No. of Brown Haired People : {data && data.users.filter((user) => user.hair.color == 'Brown').length} </h2>
    </div>
    <div>
      {data && data.users.map((user) => (
      <div key={user.id}>
        <h2>{user.firstName} {user.lastName}</h2>
        <h4>Age: {user.age} | Height: {user.height} | Hair Colour: {user.hair.color}</h4>
      </div>
    ))}
    </div>
    </>
  );
};

export default MyComponent;
