import React from 'react' 

const carticon = (props) => {
    return (
         <i onClick={props.click} className="fa fa-shopping-cart"
          style={{fontSize:'48px',color:'red', cursor:'pointer', float:'right', marginRight:'10px'}}></i>
    )
}

export default carticon