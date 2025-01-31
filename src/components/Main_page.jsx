import { useState, useEffect } from "react";

const successSound = new Audio("/success.mp3"); // Correct answer sound
const errorSound = new Audio("/error.mp3"); // Wrong answer sound

const Main_page = () => {
  const [numberSet, setnumberSet] = useState([]);
  const [answer, setanswer] = useState("");
  const [index, setindex] = useState(0);
  const [MainVisible, setMainVisible] = useState(false);
  const [BtnVisible, setBtnVisible] = useState(true);
  const [WrongAns, setWrongAns] = useState([]);
  const [TrueAns, setTrueAns] = useState([]);
  const [Result, setResult] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [answerStatus, setAnswerStatus] = useState(null); // "correct" or "wrong"

  const generateRandomNumber = () => Math.floor(Math.random() * 90) + 10;

  const NumberSetter = () => {
    const newNumbers = Array.from({ length: 20 }, () => [
      generateRandomNumber(),
      generateRandomNumber(),
    ]);

    setnumberSet(newNumbers);
    setMainVisible(true);
    setBtnVisible(false);
    setResult(0);
    setindex(0);
    setWrongAns([]);
    setTrueAns([]);
    setTimeLeft(5);
    setAnswerStatus(null);
  };

  const handleNextClick = () => {
    if (numberSet[index]) {
      const [num1, num2] = numberSet[index];
      const sum = num1 + num2;
      const userAnswer = parseInt(answer, 10);

      if (userAnswer === sum) {
        setTrueAns((prev) => [...prev, [num1, num2, userAnswer]]);
        setResult((prev) => prev + 1);
        setAnswerStatus("correct");
        successSound.play(); // Play correct sound
      } else {
        setWrongAns((prev) => [...prev, [num1, num2, userAnswer]]);
        setAnswerStatus("wrong");
        errorSound.play(); // Play wrong sound
      }

      setTimeout(() => {
        setanswer(""); // Reset input
        setindex((prev) => prev + 1);
        setTimeLeft(5); // Reset timer
        setAnswerStatus(null); // Reset status after delay
      }, 500);
    }
  };

  useEffect(() => {
    if (index < 20 && MainVisible) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleNextClick();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [index, MainVisible]);

  useEffect(() => {
    if (index >= 20) {
      setMainVisible(false);
      setBtnVisible(false);
    }
  }, [index]);

  return (
    <div className="flex flex-col items-center p-6">
      {BtnVisible && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg"
          onClick={NumberSetter}
        >
          Start
        </button>
      )}

      {MainVisible && numberSet[index] && (
        <div className="flex flex-col items-center mt-6">
          <span className="text-3xl font-bold">
            {numberSet[index][0]} + {numberSet[index][1]}
          </span>

          <input
            className={`bg-white border-2 text-gray-600 w-36 text-center mt-4 p-2 text-xl rounded-2xl transition-all ${
              answerStatus === "correct" ? "border-green-500 bg-green-100" : ""
            } ${answerStatus === "wrong" ? "border-red-500 bg-red-100" : ""}`}
            type="number"
            value={answer}
            autoFocus
            onChange={(e) => setanswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNextClick()}
          />

          {/* Timer Indicator */}
          <div className="w-full bg-gray-300 mt-4 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all"
              style={{ width: `${(timeLeft / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">Time left: {timeLeft}s</p>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 mt-4 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${(index / 20) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{index}/20 completed</p>
        </div>
      )}

      {index === 20 && (
        <div className="w-full text-center mt-6">
          <h2 className="text-2xl font-bold">Results: {Result}/20</h2>

          <div className="flex justify-around w-full mt-4">
            <div>
              <h3 className="text-lg font-semibold">Wrong Answers:</h3>
              <ul className="text-red-600">
                {WrongAns.map(([a, b, ans], i) => (
                  <li key={i}>
                    {a} + {b} ≠ {ans}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Right Answers:</h3>
              <ul className="text-green-600">
                {TrueAns.map(([a, b, ans], i) => (
                  <li key={i}>
                    {a} + {b} = {ans}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 mt-6 rounded shadow-lg"
            onClick={NumberSetter}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Main_page;
