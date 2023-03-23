import React from 'react';
import './Item.css';
import {variables} from '../Connection.js';

export function Item(props) {
    
    
    //  const deleteItem = () => {
    //     fetch(variables.API_URL+'coffee/' + props.coffeeid, {
    //         method:'DELETE',
    //         body: {
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //     }).then(res => res.json()).then();
    //  }

    return(
        
        <div className='container item-container'>

            <img src={variables.PHOTO_URL + props.photourl} alt={props.coffeename} width="250px" height="250px" /><br/>
            <label style={{fontWeight:'bold'}}>{props.coffeename}</label>
            <div>Price: {props.price.toFixed(2)} EUR</div>
            {props.editmode ? <i className="fa fa-trash" aria-hidden="true" type='button' onClick={props.onChangeValue} id={props.coffeeid}></i> : null}
            
        </div>

    );


}

