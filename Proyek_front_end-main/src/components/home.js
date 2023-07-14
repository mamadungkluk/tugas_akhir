import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import './Home.css'; // Import file CSS

function Home() {
  const { products } = useContext(ProductContext);

  return (
    <div className="home-container">
      <table className="home-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="product-list__ok">
              <td>{product.name}</td>
              <td>Rp. {product.price ? product.price.toLocaleString() : ''}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="home">
        <footer className="home__footer">
          <p>
            &copy;{" "}
            <a
              href="https://instagram.com/alimhs17?igshid=MzNlNGNkZWQ4Mg=="
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              <span className="instagram-link-text">alimhs17</span>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
