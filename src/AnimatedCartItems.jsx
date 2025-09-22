import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'

const AnimatedCartItem = ({ item }) => {
    const dispatch = useDispatch();

    const [isDeleting, setIsDeleting] = useState(false);

    const handleIncrement = () => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = () => {
        item.quantity > 1 ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1})) : dispatch(removeItem(item));
    };

    const handleRemove = () => {
        setIsDeleting(true);
    
    setTimeout(() => {
        dispatch(removeItem({ name: item.name }));
    }, 500);
    };

    const calculateTotalCost = () => {
        const itemCost = parseFloat(item.cost.substring(1));
        const itemtotal = item.quantity * itemCost;
        return itemtotal.toFixed(2);
    };

    return (
        <div className={`cart-item ${isDeleting ? 'deleting' : ''}`}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className='cart-item-delatis'>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="car-item-controls">
                <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={handleDecrement}>-</button> 
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={handleIncrement}>+</button> 
                </div>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost()}</div>
                <button className="cart-item-delete" onClick={handleRemove}>Delete</button>
            </div>

        </div>
    );
};

export default AnimatedCartItem;