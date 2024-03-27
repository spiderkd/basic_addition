import { useState, useEffect } from "react";

const Main_page = () => {
  const [numberSet, setnumberSet] = useState([]);
  const [answer, setanswer] = useState("");
  const [index, setindex] = useState(0);
  const [MainVisible, setMainVisible] = useState(false);
  const [BtnVisible, setBtnVisible] = useState(true);
  const [WrongAns, setWrongAns] = useState([]);
  const [TrueAns, setTrueAns] = useState([]);
  const [Result, setResult] = useState(0);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 90) + 10;
  };

  const NumberSetter = () => {
    if (numberSet.length < 20) {
      for (let i = 0; i < 20; i++) {
        var num1 = generateRandomNumber();
        var num2 = generateRandomNumber();
        const sets = [];
        sets.push(num1, num2);
        setnumberSet((set) => [...set, sets]);
      }
    }
    setMainVisible((prevState) => !prevState);
    setBtnVisible((prevState) => !prevState);
    setResult(0);
  };

  const handleNextClick = () => {
    if (numberSet[index]) {
      const add = numberSet[index][0] + numberSet[index][1];
      const index1 = numberSet[index][0];
      const index2 = numberSet[index][1];
      const index3 = parseInt(answer, 10);
      if (index3 === add) {
        setTrueAns((set) => [...set, [index1, index2, index3]]);
        setResult((prevResult) => prevResult + 1);
        console.log("true");
      } else {
        setWrongAns((set) => [...set, [index1, index2, index3]]);
        console.log("false");
      }

      setindex((prevIndex) => prevIndex + 1);
      setanswer(""); // Reset answer after each question
      // Reset the timer for the next question
    }
  };

  useEffect(() => {
    console.log("TrueAns:", TrueAns);
    console.log("WrongAns:", WrongAns);
    if (index >= 20) {
      setMainVisible(false);
      setBtnVisible(false);
    }
  }, [TrueAns, WrongAns, index]);

  return (
    <div>
      {BtnVisible && (
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-6 border border-gray-400 rounded shadow"
          onClick={NumberSetter}
        >
          Start
        </button>
      )}

      {MainVisible && (
        <div>
          <div className="flex flex-col text-2xl content-baseline ">
            {numberSet[index] && (
              <span className="">
                {numberSet[index][0]} + {numberSet[index][1]}
              </span>
            )}

            <input
              className="bg-white  border border-gray-400 rounded-2xl text-gray-600  w-36  my-3"
              type="text"
              value={answer}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleNextClick();
                }
              }}
              onChange={(e) => setanswer(e.target.value)}
            />
          </div>
        </div>
      )}
      {(index === 20 || index > 20) && (
        <div>
          <div className="flex flex-row justify-evenly w-full">
            <div className="px-14">
              <h2>Wrong Answers:</h2>
              <ul>
                {WrongAns.map((item, index) => (
                  <li key={index}>
                    {item[0]} + {item[1]} = {item[2]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-14">
              <h2>Right Answers:</h2>
              <ul>
                {TrueAns.map((item, index) => (
                  <li key={index}>
                    {item[0]} + {item[1]} = {item[2]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-8">
            <h2>Results are :{Result}/20</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main_page;
