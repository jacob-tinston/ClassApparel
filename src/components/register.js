/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import store from '../app/store';
import { 
    selectRegisterForename, selectRegisterSurname, selectRegisterEmail, selectRegisterPassword,
    updateRegisterForename, updateRegisterSurname, updateRegisterEmail, updateRegisterPassword
} from '../features/registerSlice';

const Register = () => {
    const forename = useSelector(selectRegisterForename);
    const surname = useSelector(selectRegisterSurname);
    const email = useSelector(selectRegisterEmail);
    const password = useSelector(selectRegisterPassword);

    const handleInputChange = (e) => {
        switch (e.target.id) {
            case 'forename' :
                store.dispatch(updateRegisterForename(e.target.value))
                break;
            case 'surname' :
                store.dispatch(updateRegisterSurname(e.target.value))
                break;
            case 'email' :
                store.dispatch(updateRegisterEmail(e.target.value))
                break;
            case 'password' :
                store.dispatch(updateRegisterPassword(e.target.value))
                break;
            default :
                console.log('Invalid Input');
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            forename: forename,
            surname: surname,
            email: email,
            password: password
        };
    
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },        
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                window.alert('Thanks for signing up!');
                window.location.reload();
            } else if (response.status === 403) {
                window.alert('Whoops! Email already taken!');
            };
        })
    }

    return (
        <main id="login" className="container">
            <section className="padding-bottom padding-top">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Register Account</h4>
                </header>
                
                <div className="row">
                    <div className="col-md-8">
                        <div className="card-banner banner-quote overlay-gradient" style={{backgroundImage: "url('assets/images/banners/banner9.jpg')"}}>
                            <div className="card-img-overlay white">
                            <h3 className="card-title">Already Have An Account?</h3>
                            <p className="card-text" style={{maxWidth: '400px'}}>Login now and gain access to all of your bonuses!</p>
                            <Link to="/login" className="btn btn-primary rounded-pill">Login</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card card-body">
                            <h4 className="title py-3">Hello There! Register Here</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input defaultValue={forename} className="form-control" id="forename" placeholder="First Name" type="text"
                                            onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <input defaultValue={surname} className="form-control" id="surname" placeholder="Surname" type="text" 
                                            onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <input defaultValue={email} className="form-control" id="email" placeholder="Email Address" type="email"
                                            onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <input defaultValue={password} className="form-control" id="password" placeholder="Password" type="password"
                                            onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <Link to="/login">Already have an account?</Link>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-warning">Register</button>
                                </div>
                            </form>
                        </div>
                    </div> 
                </div> 
            </section>
        </main> 
    )
};

export default Register;