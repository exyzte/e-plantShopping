import React, { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { showCartView, showProductListView } from './uiSlice';
import { cartCounter } from './CartSlice';
import plantsData from './json/plants.json';
import MoreInfoCard from './More-Info-Card';

function ProductList({ onHomeClick }) {
    const [addedToCart, setAddedToCart] = useState({});
    const isCartView = useSelector(state => state.ui.isCartView);
    const dispatch = useDispatch();
    const cartCount = useSelector(cartCounter);
    const [ isInfoCardVisible, setIsInfoCardVisible ] = useState(false);
    const [ selectedPlantInfo, setSelectedPlantInfo ] = useState('');
    
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        dispatch(showCartView());
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        dispatch(showProductListView()); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        dispatch(showProductListView());
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        
        setAddedToCart((prevState) => ({
        ...prevState,
        [product.name]: true,
        }))
    }

    const showMoreInfo = (plantInfo) => {
        setSelectedPlantInfo(plantInfo);
        setIsInfoCardVisible(true);
    }

    const hideMoreInfo = () => {
        setIsInfoCardVisible(false);
        setSelectedPlantInfo('');
    }

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path></svg></h1></a><div className="itemsNumber">{cartCount}</div> </div>
                    
                </div>
            </div>
            {isCartView ? (
                <CartItem />
            ) : isInfoCardVisible ? ( 
                <MoreInfoCard info={selectedPlantInfo} onClose={hideMoreInfo} />
            ) : (
                <div className="product-grid">
                    {plantsData.categories.map((category, index) => (
                        <div className="category-division" key={index}>
                            <h1>{category.category}</h1>
                            <div className='product-list'>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img src={plant.image} alt={plant.name} className="product-image" />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <div className="viewMore" onClick={() => showMoreInfo(plant['info-card'])}>View More...</div>
                                        <div className="info-card" ></div>
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            className="product-button"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
