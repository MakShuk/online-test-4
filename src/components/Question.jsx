import React from 'react';

const Question = ({ question, selectedAnswers = [], onAnswerSelect }) => {
  const handleOptionClick = (index) => {
    let newSelected;
    if (selectedAnswers.includes(index)) {
      // Убираем ответ если он уже выбран
      newSelected = selectedAnswers.filter(i => i !== index);
    } else {
      // Добавляем новый ответ
      newSelected = [...selectedAnswers, index];
    }
    onAnswerSelect(newSelected);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswers.includes(index)
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            } transition-colors duration-200`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;