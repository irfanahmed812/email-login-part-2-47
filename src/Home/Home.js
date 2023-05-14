import React, { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        document.title = 'Signup.com'
    }, [])

    return (
        <div>
            <h2>This is home </h2>
        </div>
    );
};

export default Home;