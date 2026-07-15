import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const conversationSlice = createSlice({
    name: "conversation",
    initialState : {
        conversations:[],
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload)
        }

    }
    
})

export const {}=conversationSlice.actions
export default conversationSlice.reducer