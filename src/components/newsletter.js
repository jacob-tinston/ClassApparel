import React from "react";
import store from '../app/store';
import { useSelector } from 'react-redux';
import { updateNewsletter, selectNewsletter } from '../features/newsletterSlice';

const Newsletter = () => {
    const email = useSelector(selectNewsletter);

    const handleInputChange = (e) => {
        store.dispatch(updateNewsletter(e.target.value));
    }

    const handleFormSubmit = (e) => {
        fetch('/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },        
            body: JSON.stringify({email: email})
        }).then(response => {
            if (response.status === 200) {
                store.dispatch(updateNewsletter(""));
                document.getElementById('newsletter-email').value = "";
                window.alert('Thanks for signing up!');
            } else if (response.status === 403) {
                window.alert('You\'re already signed up!');
            };
        });
    }

    return (
        <section className="section-subscribe padding-y-lg">
            <div className="container">
            
            <p className="pb-2 text-center text-white">Delivering the latest product trends and industry news straight to your inbox</p>
            
            <div className="row justify-content-md-center">
                <div className="col-lg-5 col-md-6">
            <form className="form-row" onSubmit={handleFormSubmit}>
                    <div className="col-md-8 col-7">
                    <input id="newsletter-email" className="form-control border-0" defaultValue={email} onChange={handleInputChange} 
                            placeholder="Your Email*" type="email" required />
                    </div>
                    <div className="col-md-4 col-5">
                    <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope"></i> Subscribe </button>
                    </div> 
            </form>
            <small className="form-text text-white-50">We’ll never share your email address with a third-party. </small>
                </div> 
            </div>
                
            
            </div>
        </section>
    )
};

export default Newsletter;