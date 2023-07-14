import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ProductList.css';
import { ProductContext } from './ProductContext';

function ProductList() {
  const { products, setProducts } = useContext(ProductContext);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductAction, setNewProductAction] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [formError, setFormError] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4545/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error retrieving products:', error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const addProduct = async () => {
    if (newProductName && newProductPrice && newProductAction) {
      try {
        const response = await axios.post('http://localhost:4545/product', {
          name: newProductName,
          price: newProductPrice,
          action: newProductAction,
        });
        setProducts([...products, response.data]);
        setNewProductName('');
        setNewProductPrice('');
        setNewProductAction('');
        setFormError(false);
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    } else {
      setFormError(true);
    }
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4545/product/${productId}`);
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const editProduct = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      setEditProductId(productId);
      setNewProductName(product.name);
      setNewProductPrice(product.price.toString());
      setNewProductAction(product.action);
    }
  };

  const updateProduct = async () => {
    try {
      const updatedProducts = products.map((product) => {
        if (product._id === editProductId) {
          return {
            ...product,
            name: newProductName,
            price: parseInt(newProductPrice),
            action: newProductAction,
          };
        }
        return product;
      });
      await axios.put(`http://localhost:4545/product/${editProductId}`, {
        name: newProductName,
        price: newProductPrice,
        action: newProductAction,
      });
      setProducts(updatedProducts);
      setNewProductName('');
      setNewProductPrice('');
      setNewProductAction('');
      setEditProductId(null);
      setFormError(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="product-list">
      <h2 className="product-list__title">Products</h2>
      {addSuccess && <p className="success-message">Product has been added!</p>}
      <table className="product-list__table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>Rp. {product.price ? product.price.toLocaleString() : ''}</td>
              <td>{product.action}</td>
              <td>
                <button className="btn" onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
                <button className="btn" onClick={() => editProduct(product._id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="product-list__form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Action"
          value={newProductAction}
          onChange={(e) => setNewProductAction(e.target.value)}
        />
        {formError && <p className="error-message">Please complete the form</p>}
        {editProductId ? (
          <button className="btn" onClick={updateProduct}>
            Update
          </button>
        ) : (
          <button className="btn" onClick={addProduct}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
