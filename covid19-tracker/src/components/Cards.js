import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out whats destroying our Lives!!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/covid1.jpg'
              text='Mysterious virus take over the world causing a complete shutdown of the economy'
              label='Global Pandemic'
              path='/services'
            />
            <CardItem
              src='images/covid2.jpg'
              text=''
              label='Microscopic Organism'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/covid3.png'
              text='Scientist try to figure out how to cure this virus'
              label='Deadly Virus'
              path='/services'
            />
            <CardItem
              src='images/covid4.jpg'
              text=''
              label='Mysterious Cause'
              path='/products'
            />
            <CardItem
              src='images/covid5.jpeg'
              text=''
              label='Unknown'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
