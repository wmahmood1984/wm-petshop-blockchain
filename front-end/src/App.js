import logo from './logo.svg';
import React,{useEffect} from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { initWeb3, loadAdopters } from './store/adoptSlice';
import { PetList } from './components/PetList';
import { Adopters } from './components/adopters';

function App() {
  
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle
  })

 

  useEffect (()=>{
    dispatch(initWeb3())
    setInterval(() => {
      //console.log("interval called")
      dispatch(loadAdopters()) 
     }, 2000);
    
    
  },[toggle])



  return (
    <div className="App">
      
      Hello world
      <PetList></PetList>
      <Adopters></Adopters>
    </div>
  );
}

export default App;
