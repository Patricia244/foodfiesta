import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar className="navbar"/>
      <header className="header" style={{ backgroundImage: `url(${landingImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="header-content">
          <h1>Welcome to FoodFiesta!</h1>
          <p>Your one-stop shop for delicious food.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </header>
      <main>
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            <div className="product">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" alt="Gourmet Snacks" className="product-image" />
              <h3>Gourmet Snacks</h3>
              <p>Explore our collection of gourmet snacks.</p>
            </div>
            <div className="product">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e" alt="Organic Produce" className="product-image" />
              <h3>Organic Produce</h3>
              <p>Fresh and organic fruits and vegetables.</p>
            </div>
            <div className="product">
              <img src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec" alt="Artisan Breads" className="product-image" />
              <h3>Artisan Breads</h3>
              <p>Handcrafted breads made with love.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 FoodFiesta. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
