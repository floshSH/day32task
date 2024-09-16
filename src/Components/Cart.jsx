import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, removeItem } from '../Slice/ToDoSlice'; 


const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState(items);
  

  useEffect(() => {
    setLocalCart(items);
  }, [items]);

  const handleChange = (e, item) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > item.stock) { 
      e.target.value = item.stock;
      alert(`Out of stock! Choose below ${item.stock}`);
      return;
    }
    dispatch(updateItemQuantity({ id: item.id, quantity }));
  };

  const handleRemoveButton = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const calculateDiscount = (price, discountPercentage, quantity ) => {
    return ((price * discountPercentage * (quantity || 1)) / 100).toFixed(2);
  };

  return (
    <div className='cart-container'>
      {localCart.map((item) => (
        <div className='cart-item bg-secondary-subtle' key={item.id}>
          <form onSubmit={handleSubmit}>
            <div className="cart-item-content" >
              <div className="cart-item-image">
                <img src={item.thumbnail} alt="productImg" />
              </div>
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <div className="cart-item-description">
                  <div><strong>Details & Core:</strong></div>
                  <br /> {item.description}
                </div>
               
              </div>
              <div className="cart-item-actions">
                <div>
                    <label>Avail. quantity</label>
                    <div>{item.count}</div>
                </div>
                <br />
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    name='count'
                    value={item.quantity || 1} 
                    onChange={(e) => handleChange(e, item)}
                    max={item.stock}
                    required
                  />
                </div>
                <br />
                <div><label>Price: </label> ${item.price}</div>
                <br />
                <div className='remove-button' onClick={() => handleRemoveButton(item)}>Remove</div>
              </div>
            </div>
            <hr />
            <div className='cart-item-summary'>
              <div className='summary-row'>
                <div className='text-secondary'>SUBTOTAL</div>
                <div className='text-secondary'>${item.price * (item.quantity || 1)}</div>
              </div>
              <div className='summary-row'>
                <div className='text-secondary'>SHIPPING</div>
                <div className='text-secondary'>FREE</div>
              </div>
              <div className='summary-row'>
                <div className='text-secondary'>DISCOUNT</div>
                <div className='text-secondary'>${calculateDiscount(item.price, item.discountPercentage, item.quantity)}</div>
              </div>
              <hr />
              <div className='summary-row'>
                <div>TOTAL</div>
                <div>${(item.price * (item.quantity || 1)) - (calculateDiscount(item.price, item.discountPercentage) * (item.quantity || 1))}</div> 
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Cart;
