import React, { useState, useEffect } from 'react';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.init';
import { NavLink } from 'react-router-dom';


const auth = getAuth(app);

const Register = () => {

    // title dicleare
    useEffect(() => {
        document.title = 'Signup.com | Register'
    }, []);

    const [suucces, setSuccess] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');

    const handleOnSubmit = (event) => {

        // form reload hobe na
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const phoneNumber = form.phone.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password, name);

        // password validate
        if (!/(?=.*[A-Z],*[A-Z])/.test(password)) {
            setErrorPassword('Please provide at lest two uppercase');
            return
        }
        if (password.length < 6) {
            setErrorPassword('Please provide at lest 6 digit');
            return
        }
        if (!/(?=.*[!#$%&?@])/.test(password)) {
            setErrorPassword('please provide special charecter');
            return
        }
        // emtey password
        setErrorPassword('');

        // create user with email & password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(user);
                form.reset() // reset form
                // verify email
                verifyEmail()
                // update user
                updateUserName(name, phoneNumber)
            }).catch(error => {
                console.log('Error:', error)
                setErrorPassword(error.message)
            })

        // verify email
        const verifyEmail = () => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert('Please verify your email. To verify email to check your mail inbox')
                })
        }

        // update user details
        const updateUserName = (name, phoneNum) => {
            updateProfile(auth.currentUser, {
                displayName: name,
                phoneNumber: phoneNum,
            })
        }
    }

    return (
        <div className='container pt-5'>
            <div className="w-50 mx-auto shadow p-4 form-text-al">
                <h4 className='py-2'>Please Register</h4>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control name='name' type="text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Your Phone</Form.Label>
                        <Form.Control name='phone' type="number" placeholder="Enter phone number" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address <span className='text-danger'>*</span></Form.Label>
                        <Form.Control required name='email' type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                        <Form.Control required name='password' type="password" placeholder="Password" />
                    </Form.Group>
                    {
                        <p className='text-danger my-2'>{errorPassword}</p>
                    }
                    {
                        suucces && <p className='text-success'>Registerd successfully</p>
                    }
                    <Button className='w-100' variant="dark" type="submit">
                        Submit
                    </Button>
                    <div className="pt-3">
                        <p>If you have an account <NavLink to="/login">click here</NavLink></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;