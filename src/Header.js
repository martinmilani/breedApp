import React from "react"
import dogIcon from "./703120-200.png"

function Header() {
    return (
        <div className="header">
            <img className="section__logo" src={dogIcon} alt="dog logo"></img>
            <div className="section__title">
                <h1>Dogs Breed App</h1>
            </div>
            <hr className="section__line"></hr>

        </div>

    )
}

export default Header