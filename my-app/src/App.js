
import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './components/cards';
import { Footer } from './components/footer';
const URL = "http://localhost:3000/stores"
function App() {
  const [State,setState] = useState([])
   useEffect(()=>{
    fetch(URL,{
      method:"GET",
      headers:{
        "content-type":"Application/json"
      }
    }).then((res)=>{
         return res.json();
    }).then((result)=>{
      setState(result.data);
      console.log("data", result.data);
  
    })
   },[URL])
  
  return (
    <div >
    <h1 className='heading'> E-BOOK HUB </h1>
   {State.map((item)=>{
    return (<div className='card' key={item.id}>
      <Card   data  = {item}/>
    </div>);
   })}    
   <Footer/>
    </div>
  );
}

export default App;
