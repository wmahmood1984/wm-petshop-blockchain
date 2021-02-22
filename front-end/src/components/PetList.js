import React, { useState } from 'react'
import petListJson from '../pets.json'
import { useDispatch, useSelector } from 'react-redux';
import { loadAdopters, loadAbandon, toggle } from '../store/adoptSlice';
import image from './images/unnamed.gif'

export const PetList = () => {

  const [resultAvb, setResultAvb] = useState(false)

    const dispatch = useDispatch()
  const contract = useSelector((state)=>{
    return state.adoptReducer.contract;
  })

  const address = useSelector((state)=>{
    return state.adoptReducer.address;
  })

  const adopters = useSelector((state)=>{
    return state.adoptReducer.adopters;
  })


  

    return (
        <div>

        
            Pet list

            {petListJson.map((item)=>(
                <div key={item.id} style={{  border: "1px solid black", display: "inline-block", padding:"20px", margin:"10px"}}>
                    <div>
                    <h3>{item.name}</h3>
                    </div>

                <div>

            <img alt="140x140" data-src="holder.js/140x140" src={item.picture} data-holder-rendered="true"></img>
            <br/><br/>
            <strong>Breed</strong>: <span>{item.breed}</span><br/>
            <strong>Age</strong>: <span>{item.age}</span><br/>
            <strong>Location</strong>: <span>{item.location}</span><br/><br/>
            <div>{adopters[item.id]}</div>
            {!resultAvb?
            <button 
            disabled = {adopters[item.id]!='0x0000000000000000000000000000000000000000'}
            type="button" onClick={async()=>{
            setResultAvb(true)
            console.log("before",resultAvb)
            const result = await contract.methods.adopt(item.id).send({from : address})
            setResultAvb(false)
            console.log("after",resultAvb)
            dispatch(loadAdopters())
            dispatch(toggle())
            
            
        }}>{adopters[item.id]=='0x0000000000000000000000000000000000000000'? "Adopt" : "Already adopted"}</button>
        :
        <img width="50px" src={image}/>
          }


            
        
        
        </div>
        <br/><br/>
        {adopters[item.id]!='0x0000000000000000000000000000000000000000'? <button
        onClick={async()=>{
          const result = await contract.methods.abandon(item.id).send({from: address})
          console.log('result ', result)
          dispatch(loadAbandon(item.id,address))
          dispatch(toggle())
        }}
        
        >Abandon</button>: null}

                </div>
            ))}
        </div>
    )
}



          <div class="panel-body">
            
            
          </div>
