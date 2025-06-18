import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const passwordRef = useRef(null);

  // Password generation logic
  useEffect(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (character) str += "!@#$%&*";
    if (number) str += "0123456789";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, character, number]);

  // Copy to clipboard and show toast
  const copyPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3 seconds
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 relative">
      {/* Toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg transition duration-300 animate-slide-in">
          Password copied to clipboard!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-red-700">Password Generator</h1>

      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-lg p-6 space-y-4">
        <div className="flex">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="flex-1 px-4 py-2 border rounded-l-md outline-none"
          />
          <button
            onClick={copyPassword}
            className="bg-red-600 text-black px-4 py-2 rounded-r-md hover:bg-red-800 transition-colors duration-300"
          >
            Copy
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium text-white">Length: {length}</label>
            <input
              type="range"
              id="length"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 text-white rounded-lg appearance-none cursor-pointer range-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="number"
              checked={number}
              onChange={() => setNumber(prev => !prev)}
            />
            <label htmlFor="number" className="font-medium text-white">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="character"
              checked={character}
              onChange={() => setCharacter(prev => !prev)}
            />
            <label htmlFor="character" className="font-medium text-white">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
