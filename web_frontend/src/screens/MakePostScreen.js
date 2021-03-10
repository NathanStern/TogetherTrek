import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
const MakePostScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [destinations, setDestinations] = useState('')
    const [response, setResponse] = useState('')
    const handleSubmit = () => {
        console.log(`Title is ${title}, description: ${description}, destinations: ${destinations}`)
        callAPI();
    }
    
    const callAPI = () => {
        fetch("http://localhost:3001/post/test")
            .then(res => res.text())
            .then(res => setResponse(res));
    }
    

    return (
        <div>
            <h3 className='col-lg-4'> New Post</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Title:  </label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Description:</label>
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Destinations:</label>
                    <input type="text" value={destinations} onChange={(event) => setDestinations(event.target.value)} />
                </div>
                <button >Post</button>
            </form>
            <p className='api'><label> resp: {response} </label></p>
        </div>
    )
}

export default MakePostScreen