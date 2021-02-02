import React from 'react';

const RentItem = ({ name, type, price, actions, rented, rentTime }) => {
    return (
        <div className="rent-item">
            <p className="description">
                {name} / {type[0].toUpperCase() + type.substr(1)} / ${price} {rented ? `/ ${rentTime} hours` : ''}
            </p>
            <div className="actions">{actions}</div>
        </div>
    );
};

export default RentItem;