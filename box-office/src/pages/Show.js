import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();

const initialState={
  isLoading:true,
  error:null,
  show:null

}
// action is an object of type {
// type:'d'  // in type written which type of action is performed
// }
const reducer=(prevState,action)=>{
  switch(action.type)
  {
    
   case 'FETCH_SUCCESS':{
    return {...prevState,isLoading:false,error:null,show:action.show};
   }
   case 'FETCH_FAILED':{
    return {...prevState,isLoading:false,error:action.error};
   }
  default:return prevState;

  }
}

  const [{show,isLoading,error},dispatch]=useReducer(reducer,initialState);
  // const [show, setShow] = useState(null);
  // const [isLoading,setIsLoading]=useState(true);
  // const [error,setError]=useState(null);


  useEffect(() => {

        let isMounted=true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      // setTimeout(()=>{
        if(isMounted)
        {
          dispatch({type:'FETCH_SUCCESS',show:results})
        // setShow(results);
        // setIsLoading(false);
        }
      // },2000);
    }).catch(err=>{
         if(isMounted)
         {        

          dispatch({type:'FETCH_FAILED',error:err.message})
          //  setError(err.message);
          //  setIsLoading(false);
    
        }
            });
    return ()=>{
      isMounted=false;
    }
  }, [id]);

  
   console.log('show', show);

  if(isLoading)
  {
    return <div>Data is being loaded..</div>
  }
  if(error)
  {
    return <div>ERROR OCCURED:{error} </div>
  }

 

  return <div>this is show page</div>;
};

export default Show;
