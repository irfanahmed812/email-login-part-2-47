import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../Firebase/firebase.init';
import { NavLink } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {

    // title dicleare
    useEffect(() => {
        document.title = 'Signup.com | Login'
    }, []);

    const [userEmail, setUserEmail] = useState('');
    const [suucces, setSuccess] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(user);
                form.reset() // reset form


            }).catch(error => {
                console.log('Error:', error)
            })
    }

    // reset password
    const handleOnBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your Email');
            return
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert(`Reset password link send your mail. Please check '${userEmail}'this email`)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='container pt-5'>
            <div className="w-50 mx-auto shadow p-4 form-text-al">
                <h4 className='py-2'>Please Login</h4>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address <span className='text-danger'>*</span></Form.Label>
                        <Form.Control onBlur={handleOnBlur} required name='email' type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                        <Form.Control required name='password' type="password" placeholder="Password" />
                    </Form.Group>
                    {
                        suucces && <p className='text-success'>Login successfully</p>
                    }
                    <Button className='w-100' variant="dark" type="submit">
                        Login
                    </Button>

                    <div className="d-flex justify-content-between">
                        <p className='pt-3'>Don't have an account. <NavLink to="/register">create a account</NavLink></p>
                        <p className='pt-2'><small><button className='btn btn-link' onClick={handleForgetPassword}>Forget password ?</button></small></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;