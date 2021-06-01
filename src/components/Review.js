import React from "react";
import { useState, useEffect } from "react";
import "../css/Review.css";
import { FaArrowLeft, FaArrowRight, FaRandom } from "react-icons/fa";
const Review = () => {
  const [index, setIndex] = useState(0);
  const [people, setPeople] = useState([index]);
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/review");
      const data = await res.json();
      setPeople(data);
    };

    fetchTasks();
  }, []);

  const previousPerson = () => {
    setIndex((current) => {
      return checkWithinIndex(current - 1);
    });
  };
  const nextPerson = () => {
    setIndex((current) => {
      return checkWithinIndex(current + 1);
    });
  };

  const randomPerson = () => {
    let random = Math.floor(Math.random() * people.length);
    if (random === index) {
      random = random + 1;
    }
    setIndex(checkWithinIndex(random));
  };

  const checkWithinIndex = (value) => {
    if (value < 0) {
      return people.length - 1;
    }
    if (value > people.length - 1) {
      return 0;
    }
    return value;
  };

  return (
    <div>
      <h1 className="title">Customer Reviews</h1>
      <div className="underline"></div>
      <div className="container">
        <img src={people[index].image} alt="nothing"></img>
        <h1>{people[index].name}</h1>
        <p>{people[index].text}</p>

        {/* Container for the buttons */}
        <div>
          <button onClick={previousPerson} className="previous-btn">
            <FaArrowLeft />
          </button>
          <button onClick={nextPerson} className="next-btn">
            <FaArrowRight />
          </button>
        </div>
        <button onClick={randomPerson} className="random-btn">
          <FaRandom />
        </button>
      </div>
    </div>
  );
};

export default Review;
