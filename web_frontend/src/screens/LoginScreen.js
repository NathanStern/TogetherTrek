import React, { useState } from 'react'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(`Email is ${email} and password is ${password}`)
    }
    return (
        <div>
            <h3 className='col-lg-4'> Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Email:  </label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Password:</label>
                    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button >Submit</button>
            </form>
        </div>
    )
}

export default LoginScreen
