import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
        <h1>Start your Cybersecurity Journey now!</h1>
        <div className='cards__containers'>
            <div className='cards__wapper'>
                <ul className='cards__items'>
                    <CardItem src="images/img-9.jpg"
                     text="Scholarships" 
                     label='Opportunity'
                     path='/services'/>

                    <CardItem src="images/img-2.jpg"
                     text="Youtube Tutorials" 
                     label='Video'
                     path='/services'/>
                </ul>
                <ul className='cards__items'>
                    <CardItem src="images/img-1.jpg"
                     text="Scholarships" 
                     label='Opportunity'
                     path='/services'/>
                     
                    <CardItem src="images/img-4.jpg"
                     text="Youtube Tutorials" 
                     label='Video'
                     path='/services'/>

                    <CardItem src="images/img-8.jpg"
                     text="Youtube Tutorials" 
                     label='Video'
                     path='/sign-up'/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards;