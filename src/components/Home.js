import React, { useState, useEffect, useRef } from 'react'
import recipes from './../data/recipes'

// Make clones of the first and the last recipes to loop them later
const firstRecipe = recipes[0]
const lastRecipe = recipes[recipes.length - 1]
recipes.unshift(lastRecipe)
recipes.push(firstRecipe)

function Home() {
  const slider = useRef(null)
  const [position, setPosition] = useState(-100)

  // Move the slider so that it shows the real first recipe, not the clone
  useEffect(() => {
    slider.current.style.transform = `translate(${position}vw)`
  }, [])

  const slide = (newPosition) => {
    setPosition(newPosition)
    slider.current.style.transition = 'all ease-in-out 0.3s'
    slider.current.style.transform = `translate(${newPosition}vw)`

    // Loop after the transition ends (0.3s)
    setTimeout(() => {
      const firstRealPosition = -100
      const lastRealPosition = (recipes.length - 2) * -100
      const firstClonePosition = (recipes.length - 1) * -100
      const lastClonePosition = 0

      if (newPosition === lastClonePosition) {
        setPosition(lastRealPosition)
        slider.current.style.transition = 'none'
        slider.current.style.transform = `translate(${lastRealPosition}vw)`
      }

      if (newPosition === firstClonePosition) {
        setPosition(firstRealPosition)
        slider.current.style.transition = 'none'
        slider.current.style.transform = `translate(${firstRealPosition}vw)`
      }
    }, 300)
  }

  return (
    <div className='Home'>
      <p>Все рецепты</p>

      <div className='Arrows'>
        <div onClick={() => slide(position + 100)}>←</div>
        <div onClick={() => slide(position - 100)}>→</div>
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
