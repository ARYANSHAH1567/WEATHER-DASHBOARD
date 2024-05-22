import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";
import { useState, useRef } from "react";

export default function SearchBox({ onData }) {
  const [isCount, setIsCount] = useState("0");
  const [isActive, setIsActive] = useState(false);
  const [isInput, setIsInput] = useState("");
  const inputRef = useRef(null);

  const sendDataToParent = () => {
    let data = [isInput, isCount];
    onData(data); // Invoke the callback with the data
  };

  const showAnimation = (event) => {
    if (!isActive) {
      setIsActive(true);
      setIsCount("1");
      {
        console.log("now active");
      }
      inputRef.current.focus();
    } else {
      console.log(isInput);
      setIsCount("1");
      sendDataToParent();
      setIsInput("");
    }
  };

  const removeAnimation = () => {
    setIsActive(false);
    setIsInput("");
  };

  const handleInputChange = (event) => {
    setIsInput(event.target.value);
  };

  return (
    <div className={`search-box ${isActive ? "active" : ""}`}>
      <input
        type="text"
        placeholder="Type to search"
        className={`${isActive ? "active" : ""}`}
        value={isInput}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <div
        onClick={showAnimation}
        className={`search-btn ${isActive ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div
        onClick={removeAnimation}
        className={`cancel-btn ${isActive ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
}
