import { useState, useCallback, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&()+";
    for (let i = 1; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length) + 1);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllow, charAllow]);

  const copyPassToCb = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="main">
        <input
          type="text"
          value={password}
          className="input"
          placeholder="password"
          readOnly
          ref={passRef}
        />
        <button onClick={copyPassToCb} className="btn-cp">
          copy
        </button>
        <div className="div2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            name=""
            id=""
            className="cursor-poniter"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">length:{length}</label>
          <div className="inp-tp">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              onChange={() => {
                setnumberAllow((prev) => !prev);
              }}
            />

            <label htmlFor="nuber">numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />

            <label htmlFor="nuber">characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
