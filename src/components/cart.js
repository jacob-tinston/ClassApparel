/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartLength, updateCartLength, updateCartItems } from '../features/cartSlice';
import store from '../app/store';

const Cart = () => {
    let cart = useSelector(selectCartItems);
    let cartLength = useSelector(selectCartLength);

    cart.forEach(element => {
        console.log(element)
    });

    useEffect(() => {
        fetch('/session').then(response => {
            return response.json();
        }).then(response => {
            if (!response.loggedIn) {
                window.location.href = "/login";
            }
        })
    });

    return (
        <main id="cart" className="container">
            <section className="padding-bottom padding-top">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">My Cart</h4>
                </header>
                
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-banner banner-quote">
                            <div className="card-img-overlay white">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card card-body">
                            <h4 className="title py-3">Details</h4>
                        </div>
                    </div> 
                </div> 
            </section>
        </main> 
    )
};

export default Cart;