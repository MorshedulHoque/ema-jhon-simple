import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle={
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'

    }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <h4>Quantity:  {quantity}</h4>
            <p><small> Price: {price}</small></p>
            <br/>
            <button 
            className="main-button"
            onClick = {()=> {props.removeProduct(key)}}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;