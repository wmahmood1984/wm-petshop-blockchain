import React from 'react'
import { useSelector } from 'react-redux'

export const Adopters = () => {
    const adopterlist = useSelector((state)=>{
        return state.adoptReducer.adopters
    })
    
    return (
        <div>
            <div>
                Adopters List
            </div>

            <div>
                {adopterlist.map((list,index)=>(
                    list != '0x0000000000000000000000000000000000000000'?<div key={index}>
                        Index = {index} Address = {list}
                    </div> : null
                ))}
            </div>
        </div>
    )
}
