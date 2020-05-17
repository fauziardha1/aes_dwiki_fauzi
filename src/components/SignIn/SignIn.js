import React from 'react'
import './SignIn.css'

export default function SignIn({ encryptResult, onSignInButtonPressed, onPlainTextChange, onEnKeyChange }) {
    return (
        <div className="center fullscreen">
            <article className="stack pa4 black-80 neumorphism">
                <fieldset id="sign_up" className="dtc tc text-center ba b--transparent ph0 mh0">
                    <h1 >AES-Encrypt</h1>
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Plaintext</label>
                        <input onChange={onPlainTextChange} className="pa2 input-reset ba white br2  bg-transparent w-100 measure" type="text" name="username" id="username" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Key</label>
                        <input onChange={onEnKeyChange} className="b pa2 input-reset ba white br2 bg-transparent" type="text" name="password" id="password" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="result">Result</label>
                        <input defaultValue={encryptResult} className="b pa2 input-reset ba white br2 bg-transparent" type="text" name="result" id="result" />
                    </div>
                    <div className="mt3">
                        <button onClick={onSignInButtonPressed} className="b br2 ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6"  >Encrypt</button>
                    </div>
                </fieldset>
            </article>

        </div>
    )
}
