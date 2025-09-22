import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { showProductListView } from './uiSlice'
import './CartItem.css';
import icon from './icons/cart.png';
import AnimatedCartItem from './AnimatedCartItems';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
        const itemCost = parseFloat(item.cost.substring(1));
        total += item.quantity * itemCost;
    })
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
        dispatch(showProductListView());
  };

  const handleCheckout = (e) => {
        e.preventDefault();
        alert('Proceeding to checkout!');
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty. Add some plants to your Cart! 🪴</p>
        ) : (
          cart.map(item => (
            <AnimatedCartItem key={item.name} item={item} />
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


