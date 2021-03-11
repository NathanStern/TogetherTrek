import React, { useState } from 'react'
import { component } from 'react'
import { Row, Col } from 'react-bootstrap'
const MakePostScreen = ()  => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [responseToPost, setResponse1] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(`Title is ${title}, description: ${description}, destinations: ${country}`);
        callAPI(title, description, country, city, region)
    }
    
    
    const callAPI = (title, description, country, city, region) => {
        console.log("api");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title,
                    description: description,
                    post_date: Date.now(),
                    destinations: [{
                        country: country,
                        city: city,
                        region: region
                    }] 
                })
        };
        fetch("http://localhost:3001/posts", requestOptions)
            .then(response => response.json())
            .then(res => setResponse1(JSON.stringify(res)));
            console.log("response1 " + responseToPost);
            
        
    };
    
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
                    <label> Country:</label>
                    <input type="text" value={country} onChange={(event) => setCountry(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> City:</label>
                    <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Region:</label>
                    <input type="text" value={region} onChange={(event) => setRegion(event.target.value)} />
                </div>
                <button >Post</button>
            </form>
            
        </div>
    );
    
}

export default MakePostScreen