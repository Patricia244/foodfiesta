import React, { useState } from 'react'
import './Home.css'
import backgroundImage from '../../assets/images/backgroundImage.jpg'
import ExploreMenu from '../../components/navbar/exploreMenu/ExploreMenu'
import FoodDisplay from '../../components/navbar/foodDisplay/FoodDisplay'
function Home() {
  const [category,setCategory] = useState("all")
  return (
    <div>
      <header className="header" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="header-content">
          <h1>Welcome to Food Fiesta!</h1>
          <p>Your one-stop shop for delicious food.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </header>
      <main>
        <section className="featured-products">
          <ExploreMenu category ={category} setCategory ={setCategory}/>
          <FoodDisplay category={category}/>
        </section>
      </main>
    </div>
  )
}

export default Home
