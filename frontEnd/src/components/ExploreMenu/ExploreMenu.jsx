import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Collections</h1>
        <p className="explore-menu-text">
            No matter what your taste is—sweet, spicy, healthy, or hearty—we have something for everyone. Choose from an array of food categories including vegetarian, non-vegetarian, vegan, seafood, and more. Explore desserts, snacks, beverages, and full-course meals, all in one place.
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={()=>{setCategory(prev=> prev===item.menu_name ? "All" : item.menu_name )}} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu