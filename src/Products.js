import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductImageEditor from './ProductImageEditor';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct})=> {
  
  const [searchParams, setSearchParams] = useSearchParams({})
  console.log(searchParams.get('search'))
  return (
    <div>
      <h2>Products</h2>
      <input placeholder='search' value={searchParams.get('search') || ''} onChange={(ev) => {setSearchParams(ev.target.value ? {search: ev.target.value} : {})}}/>
      <ul>
        {
          products
          .filter(product => {return !searchParams.get('search') || product.name.indexOf(searchParams.get('search')) !== -1 })
          .map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                { product.name }
                { product.image ? <img src={product.image}/> : null }
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <div>
                      <Link to={`/products/${product.id}/edit`}>Edit</Link>
                      <ProductImageEditor updateProduct={updateProduct} product={product}/>
                    </div>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
