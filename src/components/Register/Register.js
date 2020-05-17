import React from 'react'
import '../SignIn/SignIn'
import '../Register/register.css'

export default function Register({ decryptResult, onRegisterButtonPressed, onDecKeyChange, onCipherTextChange }) {
    // const userData = { name: '', username: '', email: '', password: '' }
    // const onUsernameChange = (event) => userData.username = userData.name = event.target.value;

    // const onEmailChange = (event) => userData.email = event.target.value;
    // const onPasswordChange = (event) => userData.password = event.target.value;
    const button = () => onRegisterButtonPressed();


    return (
        <div className="center fullscreen" >
            <article className="pa4 black-80 " style={{
                borderRadius: '50px',
                background: '#76b4de',
                boxShadow: 'inset 20px 20px 60px #6499bd, inset -20px -20px 60px #88cfff',
                zIndex: '100'

            }} >
                <fieldset id="sign_up" className="dtc tc text-center ba b--transparent ph0 mh0">
                    <h1>AES-Decrypt</h1>
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Cipher Text</label>
                        <input onChange={onCipherTextChange} className="pa2 input-reset ba bg-transparent w-100 measure br2 white bw1" type="text" name="username" id="username" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Key</label>
                        <input onChange={onDecKeyChange} className="pa2 input-reset ba bg-transparent w-100 measure br2 white bw1" type="email" name="email" id="email" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Result</label>
                        <input defaultValue={decryptResult} className="b pa2 input-reset ba bg-transparent br2 white bw1" type="text" name="password" id="password" />
                    </div>
                    <div className="mt3"><button onClick={button} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 br2 "  >Decrypt</button></div>
                </fieldset>
            </article>

        </div>
    )
}
