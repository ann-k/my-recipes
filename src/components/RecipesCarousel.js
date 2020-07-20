import React, { useState, useEffect, useRef } from 'react'
import recipes from './../data/recipes'
import './../stylesheets/RecipesCarousel.scss'

// Make clones of the first and the last recipes to loop them later
const firstRecipe = recipes[0]
const lastRecipe = recipes[recipes.length - 1]
recipes.unshift(lastRecipe)
recipes.push(firstRecipe)

function RecipesCarousel() {
  const slider = useRef(null)
  const [position, setPosition] = useState(1)

  // Move the slider so that it shows the real first recipe, not the clone
  useEffect(() => {
    slider.current.style.transform = `translate(${position * -100}vw)`
  }, [])

  const slide = (newPosition) => {
    setPosition(newPosition)
    slider.current.style.transition = 'all ease-in-out 0.3s'
    slider.current.style.transform = `translate(${newPosition * -100}vw)`

    // Loop after the transition ends (0.3s)
    setTimeout(() => {
      const firstRealPosition = 1
      const lastRealPosition = (recipes.length - 2)
      const firstClonePosition = (recipes.length - 1)
      const lastClonePosition = 0

      if (newPosition === lastClonePosition) {
        setPosition(lastRealPosition)
        slider.current.style.transition = 'none'
        slider.current.style.transform = `translate(${lastRealPosition * -100}vw)`
      }

      if (newPosition === firstClonePosition) {
        setPosition(firstRealPosition)
        slider.current.style.transition = 'none'
        slider.current.style.transform = `translate(${firstRealPosition * -100}vw)`
      }
    }, 300)
  }

  let activeRecipeIndex = position
  let lastRecipeIndex = recipes.length - 2
  
  // 1-2. Get correct counter on firstClone and lastClone Recipes
  // 3. Don't show counter when clicked btn too fast
  // 4. Else show regular counter
  let counter =
  activeRecipeIndex === 0 ?
  `${lastRecipeIndex}/${lastRecipeIndex}` :
  activeRecipeIndex === recipes.length - 1 ?
  `1/${lastRecipeIndex}` :
  activeRecipeIndex < 0 || activeRecipeIndex > lastRecipeIndex ?
  '' :
  `${activeRecipeIndex}/${lastRecipeIndex}`

  return (
    <div className='RecipesCarousel'>
      <button className='Arrow' id='ArrowLeft'
            onClick={() => slide(position - 1)}>
        ←
      </button>
      <button className='Arrow' id='ArrowRight'
            onClick={() => slide(position + 1)}>
        →
      </button>

      <div className='RecipesSlider' ref={slider}>
        {recipes.map((recipe, index) => {
          return (
            <div className='Recipe' key={index}>
              <div className='Paper'>
                <p>{recipe.name}</p>
                <br/>
                <p>⏲ {recipe.duration}</p>
                <br/>
                {recipe.ingredients.map((ingredient) => <p>{ingredient}</p>)}
                <br/>
                <details className='Instruction'>
                  <summary>Инструкция</summary>
                  {recipe.instruction}
                </details>
              </div>
            </div>
          )
        })}
      </div>

      <div className='Counter'>{counter}</div>
    </div>
  )
}

export default RecipesCarousel
