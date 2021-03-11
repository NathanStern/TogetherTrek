import React, { useState } from 'react'
import { component } from 'react'
import { Row, Col } from 'react-bootstrap'
const MakePostScreen = ()  => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [destinations, setDestinations] = useState('')
    const [responseToPost, setResponse1] = useState('')
    const [responseR, setResponsePost] = useState('')
    const handleSubmit = () => {
        console.log(`Title is ${title}, description: ${description}, destinations: ${destinations}`);
        callAPI();
    }
    
    
    const callAPI = () => {
        console.log("api");
        // fetch("http://localhost:3001/post")
        //     .then(res => res.text())
        //     .then(res => setResponse(res));
        // var request = new Request('http://localhost:3001/post',{
        //     form: ',
        //     method: 'post',
        //     mode: 'cors'
        // });

        // fetch(request).then(function(data){
        //     return data;
        // });
        // const responseR = fetch("http://localhost:3001/post", {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: {
        //         "title": "titleeee",
        //         "description": "im going on vacation",
        //         "post_date": "1990-01-01",
        //         "destinations": [{
        //             "country": "USA",
        //             "city": "Indy",
        //             "region": "Indiana"
        //         }]
        //     },
        //   });
        //   const body = responseR.text();
        //   this.setState({ responseR: body });
        //   console.log(responseR)
        const rep = fetch("http://localhost:3001/posts/test")
            .then(res => res.text())
            .then(res => setResponse1(res));
            console.log(rep);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: "from frontend!",
                    description: "im going on vacation yoooo",
                    post_date: "1990-01-01",
                    destinations: [{
                        country: "USA",
                        city: "Indy",
                        region: "Indiana"
                    }] 
                })
        };
        fetch("http://localhost:3001/posts", requestOptions)
            .then(response => response.json())
            .then(res => res.text())
            .then(res => setResponse1(res))
            .then(data => this.setState({ responseR: data }));
            console.log("response " + responseR);
            console.log("response1 " + responseToPost);
            
        
    };
    

    //render = () => {
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
                
            </div>
        );
   // }
    
}

export default MakePostScreen