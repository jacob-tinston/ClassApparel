/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import store from '../app/store';
import { selectLoginEmail, selectLoginPassword, updateLoginEmail, updateLoginPassword } from '../features/loginSlice';

const Login = () => {
    const email = useSelector(selectLoginEmail);
    const password = useSelector(selectLoginPassword);

    const handleInputChange = (e) => {
        switch (e.target.id) {
            case 'email' :
                store.dispatch(updateLoginEmail(e.target.value))
                break;
            case 'password' :
                store.dispatch(updateLoginPassword(e.target.value))
                break;
            default :
                console.log('Invalid Input');
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/login?email=${email}&password=${password}`).then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 403) {
                window.alert('Incorrect email or password.');
            };
        }).then(response => {
            if (response) {
                window.alert(`Thanks for logging in ${response}!`);
                window.location.href = '/';
            }
        })
    }

    return (
        <main id="login" className="container">
            <section className="padding-bottom padding-top">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Login</h4>
                </header>
                
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-banner banner-quote overlay-gradient" style={{backgroundImage: "url('assets/images/banners/banner9.jpg')"}}>
                            <div className="card-img-overlay white">
                            <h3 className="card-title">Don't Have An Account?</h3>
                            <p className="card-text" style={{maxWidth: '400px'}}>Create your account today and gain access to a wide range of bonuses!</p>
                            <Link to="/register" className="btn btn-primary rounded-pill">Register</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card card-body">
                            <h4 className="title py-3">Welcome Back! Sign In Here</h4>
                            <form onSubmit={handleSubmit}>
                                {/* <div className="form-group">
                                    <input className="form-control" id="forename" placeholder="First Name" type="text" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" id="surname" placeholder="Surname" type="text" />
                                </div> */}
                                <div className="form-group">
                                    <input defaultValue={email} className="form-control" id="email" placeholder="Email Address" type="email"
                                            onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <input defaultValue={password} className="form-control" id="password" placeholder="Password" type="password"
                                            onChange={handleInputChange} />
                                </div>
                                {/* <div className="form-group">
                                    <div className="input-group">
                                        <input className="form-control" placeholder="Quantity" name="" type="text" />
                                        
                                        <select className="custom-select form-control">
                                            <option>Pieces</option>
                                            <option>Litres</option>
                                            <option>Tons</option>
                                            <option>Gramms</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group text-muted">
                                    <p>Select template type:</p>
                                    <label className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" value="option1" />
                                        <span className="form-check-label">Request price</span>
                                    </label>
                                    <label className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" value="option2" />
                                        <span className="form-check-label">Request a sample</span>
                                    </label>
                                </div> */}
                                <div className="form-group">
                                    <Link to="/register">Don't have an account?</Link>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-warning">Login</button>
                                </div>
                            </form>
                        </div>
                    </div> 
                </div> 
            </section>
        </main> 
    )
};

export default Login;