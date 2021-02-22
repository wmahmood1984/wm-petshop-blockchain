import Web3 from 'web3'
import Adoption from '../contracts/Adoption.json'

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


var contract;
var addresses;

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
        //console.log(" init web3 called ")
        
        try {
            if(Web3.givenProvider){
                const web3 = new Web3(Web3.givenProvider);
                await Web3.givenProvider.enable()
                const networkId = await web3.eth.net.getId()
                const network = Adoption.networks[networkId]
                contract = new web3.eth.Contract(Adoption.abi, network.address);
                addresses = await web3.eth.getAccounts()
                // thunkApi.dispatch(loadAdopters({
                //     contract: contract,
                //     addresss: addresses[0]
                // }))
                
                
                return {
                    web3,
                    contract,
                    address : addresses[0],
                                   }
            }else {console.log("error in loading web3")}    
        } catch (error) {
            console.log("Error", error)
        }
        
    }
)



export const loadAdopters = createAsyncThunk(
    "loadAdopters",
    async()=>{
        const adopterlist = await contract.methods.getAdopters().call()
       // console.log("adopter list called",)
        return adopterlist;
        
        
    }
)


export const loadAbandon = createAsyncThunk(
    "loadAbandon",
    async({id,address},thunkApi)=>{
        const abandonId = await contract.methods.abandon(id).send({from:address})
        thunkApi.dispatch(initWeb3())
        return id;
        
        
    }
)

/*
export const initContract = createAsyncThunk(
    "InitWeb3",
    async()=>{
        if(Web3.givenProvider){
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable()
            console.log("initwebt3 called")
            return web3
        }else {console.log("error in loading web3")}
    }
)*/

const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
        adopters: [],
        toggle: false 
    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        }
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        },

        [loadAdopters.fulfilled] : (state,action)=>{
            state.adopters = action.payload;
        }
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions