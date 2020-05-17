import React from 'react'
import '../Navbar/Navbar.css'

export default function Navbar({ route, onRouteChange }) {
    return (
        <div className=" navbar fw9 white tc v-btm  pb5"  >

            {route === 'signin'
                ? <p onClick={onRouteChange} className="dib underline grow mr4 f1 pointer">Decrypt</p>
                : <p onClick={onRouteChange} className="dib black underline grow mr4 f1 pointer">Encrypt</p>
            }

        </div>
    )
}
