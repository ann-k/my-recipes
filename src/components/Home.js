import React, { useState, useEffect, useRef } from 'react'
import recipes from './../data/recipes'

function Home() {
  const slider = useRef(null)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    slider.current.style.transform = `translate(${position}vw)`
  }, [position])

  return (
    <div className='Home'>
      <p>Все рецепты</p>

      <div className='Arrows'>
        <div onClick={() => setPosition(position + 100)}
             className={position === 0 ? 'disabled' : ''}>
             ←
        </div>

        <div onClick={() => setPosition(position - 100)}
             className={position === -200 ? 'disabled' : ''}>
             →
        </div>
      </div>

      <div className='RecipesSlider' ref={slider}>
        {recipes.map((recipe, index) => {
          return (
            <div className='Recipe' key={index}>
              <div className='Paper'>
                <p>{recipe.name}</p>
                <p>{recipe.duration}</p>
                <p>{recipe.ingredients}</p>
                <div className='Instruction'>{recipe.instruction}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
