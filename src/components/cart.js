/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { selectCartItems, updateCartItems, updateItemQuantity, selectCartTotal } from '../features/cartSlice';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import  CheckoutForm from './checkout';
import store from '../app/store';

const stripePromise = loadStripe("pk_test_51K1GqaBQXHqBeDic9nEwxGctw3NCFfZXecnASnd0Ey7Q8pOwJR2GThYqyCN4RWBoG9WG0gkHYpMK4oLPlgg0QKfs00YHaIbX4L");

const Cart = () => {
    const [clientSecret, setClientSecret] = useState("");
    let cart = useSelector(selectCartItems);
    let cartTotal = useSelector(selectCartTotal);

    useEffect(() => {
        fetch('/session').then(response => {
            return response.json();
        }).then(response => {
            if (!response.loggedIn) {
                window.location.href = "/login";
            }
        })
    });

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: cartTotal }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [cartTotal]);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    const removeItem = (e) => {
        const index = e.target.id;
        if (cart[index].quantity === "1") {
            let updatedCart = [];

            for (let i = 0; i < cart.length; i++) {
                if (i !== parseInt(index)) {
                    updatedCart = [...updatedCart, cart[i]];
                }
            }

            store.dispatch(updateCartItems(updatedCart));
        } else {
            const newQuantity = (parseInt(cart[index].quantity) - 1).toString();
            store.dispatch(updateItemQuantity([index, newQuantity]));
        }
    };

    const initialRender = useRef(true)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            store.dispatch(updateCartItems(cart));
            fetch('/update-cart', {
                method: "PUT",
                body: JSON.stringify(cart),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }, [cart]);

    return (
        <main id="cart" className="container">
            <section className="padding-bottom padding-top">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">My Cart</h4>
                </header>
                
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-banner banner-quote cart-items-container">
                            <div>
                                {
                                    cart.map((item, i) => {
                                        return (
                                            <div key={i} className="cart-item">
                                                <img src={item.image_src}/>
                                                <div>
                                                    <h4>{item.title}</h4>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Price: £{item.price}.00</p>
                                                    <p className="price">Total: £{item.price * parseInt(item.quantity)}.00</p>
                                                    <a id={i} onClick={removeItem} className="anchor">Remove from basket</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card card-body">
                            <h4 className="title py-3">Details</h4>

                            <p className="price">Total Price: £{cartTotal}.00</p>

                            {clientSecret && (
                              <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                              </Elements>
                            )}
                        </div>
                    </div> 
                </div> 
            </section>
        </main> 
    )
};

export default Cart;