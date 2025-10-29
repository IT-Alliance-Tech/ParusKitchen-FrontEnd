import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <h2 className="text-3xl font-bold text-green-700">Thank You!</h2>
        <p className="text-gray-600">
          Your feedback helps us improve our meal plans and service.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-primary-800 mb-6">
        We Value Your Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Star
                key={index}
                size={36}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                className={`cursor-pointer ${
                  ratingValue <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            );
          })}
        </div>
        <p className="text-center text-gray-700 font-medium">
          {rating
            ? `You rated us ${rating} out of 5 ⭐`
            : "Click the stars to rate your experience"}
        </p>

        {/* Text Feedback */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Comments
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            placeholder="Tell us what you liked or what we can improve..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition duration-200"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
