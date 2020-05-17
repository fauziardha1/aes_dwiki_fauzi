import React, { Component } from 'react';
import './App.css'; import 'tachyons';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Navbar from './components/Navbar/Navbar'
const aesjs = require("aes-js");
const pbkdf2 = require("pbkdf2");

class App extends Component {
  constructor() {
    super()
    this.state = {
      route: 'signin',
      navbarColor: 'bgblue',
      enKey: '',
      plaintext: '',
      encryptResult: '',
      decryptResult: '',
      decKey: '',
      ciphertext: '',
      enResultHex: '',
    }
  }

  componentDidMount() {
    document.title = "Dwiki - Fauzi"
  }

  onRouteChange = async () => {
    const tmp = this.state.route === 'signin'
      ? 'register'
      : this.state.route === 'register'
        ? 'signin'
        : this.state.route === 'home' ? 'signin' : 'home';
    await this.setState({
      route: tmp
    })

    if (tmp === 'signin') {
      await this.setState({
        signinPass: '', signinUsername: ''
      })
    }

    if (tmp === 'signin') {
      await this.setState({
        navbarColor: 'bgblue'
      })
    } else {
      await this.setState({
        navbarColor: 'bgred'
      })
    }

  }

  onSignInButtonPressed = () => {
    const { plaintext, enKey } = this.state
    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = pbkdf2.pbkdf2Sync(enKey, 'salt', 1, 128 / 8, 'sha512');

    // Convert text to bytes
    var text = plaintext;
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    this.setState({
      encryptResult: this.hex2a(encryptedHex),
      enResultHex: encryptedHex
    });

  }


  onPlainTextChange = async (text) => {
    await this.setState({
      plaintext: text.target.value
    });

    this.onSignInButtonPressed();
  }
  onEnKeyChange = async (key) => {
    await this.setState({
      enKey: key.target.value
    });
    this.onSignInButtonPressed();
  }


  onDecryptButtonPressed = () => {
    const { enResultHex, decKey, ciphertext } = this.state;
    var cipherHex = this.a2hex(ciphertext);
    cipherHex = cipherHex.length < enResultHex ? enResultHex : cipherHex;

    var encryptedBytes = aesjs.utils.hex.toBytes(cipherHex);
    var key = pbkdf2.pbkdf2Sync(decKey, 'salt', 1, 128 / 8, 'sha512');
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    this.setState({
      decryptResult: decryptedText
    })
  }

  onCipherTextChange = async (text) => {
    await this.setState({
      ciphertext: text.target.value
    });
    this.onDecryptButtonPressed();
  }
  onDecKeyChange = async (text) => {
    await this.setState({
      decKey: text.target.value
    });
    this.onDecryptButtonPressed();
  }

  hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
  a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return arr.join('');
  }



  render() {
    const { route, navbarColor, decryptResult } = this.state
    const particlesParam = {
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    }

    return (
      <div className={navbarColor}>
        <Particles className="particles" params={particlesParam} />
        <Navbar onRouteChange={this.onRouteChange} color={navbarColor} route={route} />
        {route === 'signin' ?
          <SignIn
            onSignInButtonPressed={this.onSignInButtonPressed}
            onPlainTextChange={this.onPlainTextChange}
            onEnKeyChange={this.onEnKeyChange}
            encryptResult={this.state.encryptResult}
          /> :
          <Register
            onRegisterButtonPressed={this.onDecryptButtonPressed}
            onCipherTextChange={this.onCipherTextChange}
            onDecKeyChange={this.onDecKeyChange}
            decryptResult={decryptResult}
          />
        }
      </div>
    );
  }
}

export default App;
