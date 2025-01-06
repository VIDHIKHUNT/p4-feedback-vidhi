import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && feedback.trim()) {
      const newFeedback = { id: Date.now(), rating, feedback };
      setFeedbackList([newFeedback, ...feedbackList]);
      setRating(null);
      setFeedback("");
    } else {
      alert("Please provide both a rating and feedback!");
    }
  };

  const change = (e) => {
    setFeedback(e.target.value);
  };

  const mouseenter = (ratingValue) => {
    setHover(ratingValue);
  };

  const mouseleave = () => {
    setHover(null);
  };

  return (
    <div className="container">
      <h2>Leave Your Feedback</h2>
      <div>
        <img
          src="https://studiodog.co.uk/wp-content/uploads/2018/01/Fashion-Studio-Dog24.jpg"
          alt=""
          className="image"
        />
        <br />
        <br />
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                style={{ display: "none" }}
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                size={30}
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "gray"}
                onMouseEnter={() => mouseenter(ratingValue)}
                onMouseLeave={mouseleave}
              />
            </label>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="feedback-form">
        <h3>Feedback :-</h3>
        <textarea
          rows="4"
          placeholder="Enter Your Feedback"
          value={feedback}
          onChange={change}
        />
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="feedback-cards">
        <h3>Feedback Cards</h3>
        {feedbackList.map((entry) => (
          <div key={entry.id} className="feedback-card">
            <div>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={20}
                  color={i < entry.rating ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
            <p>{entry.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackRating;