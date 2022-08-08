import React, { useState } from 'react';
import style from './loginPage.module.scss';
import { useRouter } from 'next/router'

function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const result = await res.json();
        const { user } = result;
        if (user.length) {
            setError('');
            localStorage.setItem("user", user[0].entityId);
            localStorage.setItem("userName", user[0].name);
            router.push('/internal/Feeds');

        } else {
            setError('Error while user login.');
        }
    }

    return (
        <div className={style.loginWrapper}>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input className={style.inputClass} type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input className={style.inputClass} type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div className={style.buttonStlPar} >
                    <button className={style.buttonStl} type="submit">Submit</button>
                </div>
                <div>
                    {error ? error : ''}
                </div>
            </form>
        </div>
    )
}

export default LoginPage