import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState= {
  cart:cartItems,
  total:0,
  amount:0,
  loading:false 
}


const AppProvider = ({ children }) => {

const[ state , dispatch ] = useReducer( reducer , initialState )



const clearCart=()=>{
  dispatch({type:'CLEAR-CART' })
  // here type is a identifier 
}

const remove=(id)=>{
  dispatch({type:'REMOVE' , payload: id})
}
const increase =(id)=>{
  dispatch({type:'INCREASE', payload:id})
}
const decrease = (id) => {
  dispatch({ type: "DECREASE", payload: id });
};
const fetchData=async ()=>{
  dispatch({type:'LOADING '});
  const response = await fetch (url);
  const data = await response.json();
  dispatch({type:'DISPLAY_ITEMS' , payload:data})

}

useEffect(()=>{
 fetchData()
} , [])


useEffect(()=>{
  dispatch({type:'GET-TOTALS'})
},[state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        // toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
