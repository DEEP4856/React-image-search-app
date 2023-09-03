
import axios from 'axios'
import './App.css';
import Form from 'react-bootstrap/Form';
import {   useCallback,useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
const api_url = 'https://pixabay.com/api/';
const REACT_APP_API_KEY= '39208936-479165aa3515b152caafe5abd'
const per_page=20;

function App() {
  // console.log('key',REACT_APP_API_KEY)
  const searchinput= useRef(null);
  const [images,setimages]=useState([]);
  const [page,setPage]=useState(1);
  const [totalpage,setTotalpages]=useState(0);
  const [errorMsg, setErrorMsg] = useState('');
 
 

 
  const fetchimg= useCallback(async ()=>{
    try{
      const {data}= await axios.get(
        `${api_url}?key=${REACT_APP_API_KEY}&page=${page}&per_page=${per_page}&q=${searchinput.current.value}&image_type=photo`
      );
      setErrorMsg('')
      console.log(data)
      setimages(data.hits)
      setTotalpages(data.totalHits)
    }catch(error){
    setErrorMsg("Oops!!! Please try again")
      console.log(error)

    }
  },[page])



   // useeffect hook uses when page value changes new images will reappear or gets updated
   useEffect(()=>{
    fetchimg()
  }, [fetchimg, page])
  
 

  const handlesearch=(e)=>{
    e.preventDefault();
    console.log(searchinput.current.value)
    
    // setpage is given one so that everytime when there will new request images will show from page 1
    setPage(1)
    fetchimg();
  }

  const handleselection=(selection)=>{
      searchinput.current.value=selection
      // setpage is given one so that everytime when there will new request images will show from page 1
      setPage(1)
      fetchimg();
    }

//  console.warn(page)

  return (
    <div className='container'>
      <h1 className='title' > React Image Search App</h1>
      {errorMsg && <h1 className='error-msg'>{errorMsg}</h1>}
      <div className='search-section'>
        <Form onSubmit={handlesearch}>

      <Form.Control
        type="search"
       placeholder='Search'
       ref={searchinput}
      />
      </Form>
      </div>

      <br></br>
      <>
      <Button onClick={()=> handleselection('Nature')} variant="primary">Nature</Button>{' '}
      <Button onClick={()=> handleselection('Health')}  variant="success">Health</Button>{' '}
      <Button onClick={()=> handleselection('Animals')} variant="warning">Animals</Button>{' '}
      <Button onClick={()=> handleselection('Sports')}  variant="danger">Sports</Button>{' '}
      <Button onClick={()=> handleselection('Food')}  variant="dark">Food</Button>{' '}
      <Button onClick={()=> handleselection('Space')}  variant="info">Space</Button>{' '}
      </>
      <br></br>
      <br></br>
      <div className='images'>
        {
          
          images.map(image=>(
            
            <img 
            key={image.id} 
            src={image.largeImageURL} 
            alt=""
            // images={image}
            className='image'
            />
            
            
            ))
          }
          
      </div>
 <div className='buttons'>
 {page>1 &&<Button className='prev mr-1' variant="outline-danger" onClick={()=>setPage(page-1)}>Previous</Button>}
 {page<totalpage &&<Button className='nxt mr-1' variant="outline-primary"onClick={()=>setPage(page+1)}>Next</Button>}
 
 </div>

          
  </div>
  );
 
}

export default App;
