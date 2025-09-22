import React, { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { showCartView, showLandingPage } from './uiSlice';
import { cartCounter } from './CartSlice';
import plantsData from './json/plants.json';
import MoreInfoCard from './MoreInfoCard';
import icon from './icons/icon.png';
import cart from './icons/cart.png';

function ProductList({ onHomeClick }) {
    const [addedToCart, setAddedToCart] = useState({});
    const isCartView = useSelector(state => state.ui.isCartView);
    const dispatch = useDispatch();
    const cartCount = useSelector(cartCounter);
    const [ isInfoCardVisible, setIsInfoCardVisible ] = useState(false);
    const [ selectedPlantInfo, setSelectedPlantInfo ] = useState('');
    

    const styleObj = {
        backgroundColor: '#94c973',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
        paddingLeft: '35px',
        height: '6rem',
        marginBottom: '20px',
    }
    const styleObjUl = {
        marginTop: '4px',
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
        dispatch(showLandingPage());
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        dispatch(showCartView());
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

    const iconStyle = {
        width: '90px',
        height: '90px',
        marginRight: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '50%',
        objectFit: 'cover',
    }

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury brand" onClick={handleHomeClick}>
                        <img src={icon} alt="Logo" style={iconStyle} />
                        <a>
                            <div className="brand-text">
                                <h3 style={{ color: 'white' }}>E-Plant Paradise</h3>
                                <i style={{ color: 'white' }}>Build your dream garden from the confort of your home</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" style={styleA}> </a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}> <img src={cart} alt="cart-icon" style={iconStyle} /> </a><div className="itemsNumber">{cartCount}</div> </div>
                    
                </div>
            </div>
            {isCartView ? (
                <CartItem />
            ) : (
                <div className="product-grid">
                    {plantsData.categories.map((category, index) => (
                        <div className="category-division" key={index}>
                            <h1 className="categories">{category.category}</h1>
                            <div className='product-list'>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img src={plant.image} alt={plant.name} className="product-image" />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <div className="viewMore" onClick={() => showMoreInfo(plant['info-card'])}>View More...</div>
                                        
                                        <button

                                            onClick={() => handleAddToCart(plant)}
                                            className={`product-button ${addedToCart[plant.name] ? 'disabled' : ''}`}
                                            disabled={addedToCart[plant.name]}
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
            {isInfoCardVisible && (
                <MoreInfoCard info={selectedPlantInfo} onClose={hideMoreInfo} />
                
            )}
        </div>
    );
}

export default ProductList;
