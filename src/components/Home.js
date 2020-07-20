import React, { useState, useEffect, useRef } from 'react'
import RecipesCarousel from './RecipesCarousel'
import './../stylesheets/Home.scss'

function Home() {
  return (
    <div className='Home'>
      <header>
        <p>Все рецепты</p>
      </header>

      <RecipesCarousel></RecipesCarousel>
    </div>
  )
}

export default Home
