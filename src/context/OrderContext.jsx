import {
  createContext,
  useEffect,
  useState,
  } from "react";
  
  import {
  collection,
  getDocs,
  } from "firebase/firestore";
  
  import { db }
  from "../firebase";

  
  export const OrderContext =
createContext();

export const OrderProvider =
({ children }) => {

const [
orders,
setOrders
] =
useState([]);

useEffect(() => {

const fetchOrders =
async () => {

try {

const snapshot =

await getDocs(

collection(
db,
"orders"
)

);

const data =

snapshot.docs.map(
(doc)=>({

id:
doc.id,

...doc.data(),

})
);
data.sort(

  (a,b)=>
  
  b.createdAt
  -
  
  a.createdAt
  
  );

setOrders(
data
);

}

catch(err){

console.log(
err
);

}

};

fetchOrders();

}, []);

return (

<OrderContext.Provider

value={{

orders,

setOrders,

}}

>

{children}

</OrderContext.Provider>

);

};
  
  export default OrderProvider;