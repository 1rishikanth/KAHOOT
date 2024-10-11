// frontend/src/components/CreateQuiz.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../api'; // Ensure this is pointing to your backend API function

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);
  const navigate = useNavigate(); // Use navigate instead of history.push

  // Function to add a new empty question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  // Handle changes to questions
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Handle changes to options
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Submit the quiz creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createQuiz({ title, questions }); // Make sure createQuiz function exists
      console.log('Quiz created successfully:', response.data);
      navigate('/home'); // Navigate back to home page or wherever you want
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, 'questionText', e.target.value)
              }
            />
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                className="form-control mb-2"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optIndex, e.target.value)
                }
              />
            ))}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, 'correctAnswer', e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddQuestion}>
          Add Another Question
        </button>
        <button type="submit" className="btn btn-primary">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
