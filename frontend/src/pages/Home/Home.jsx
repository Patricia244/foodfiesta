import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { menuList } from '../../assets/images/assets';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='home-container'>
      <header className="header">
        <div className="header-content">
          <h1>Welcome to Food Fiesta!</h1>
          <p>Your one-stop shop for delicious food.</p>
          <button className='cta-button' onClick={() => navigate('/menu')}>Shop now</button>
        </div>
      </header>
      <main>
        <section className="featured-products">
          <h2>Featured Dishes</h2>
          <div className="product-grid">
           {menuList.slice(0,3).map((item, index) => (
                      <div className="product-card" key={index}>
                        <img src={item.image} alt={item.alt}/>
                      <h3 className='exploreMenu-item-heading'>{item.menuName}</h3>
                      <p className='exploreMenu-item-desc'>{item.desc}</p>
                      </div>
                  ))}
          </div>
          <p className='explore-more' onClick={()=>navigate('menu')}>Explore menu</p>
        </section>
        <section className="testimonials">
          <h2>What Our Customers Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"The food was amazing! Highly recommend!"</p>
              <p>- John Doe</p>
            </div>
            <div className="testimonial-card"> 
              <p>"Great service and delicious meals!"</p>
              <p>- Jane Doe</p>
            </div>
          </div>
        </section>
        <section className="about-us">
          <h2>About Food Fiesta</h2>
          <p>We are passionate about delivering the best food experience to our customers. Our mission is to provide delicious, high-quality meals that bring people together.</p>
        </section>
      </main>
    </div>
  );
}

export default Home;