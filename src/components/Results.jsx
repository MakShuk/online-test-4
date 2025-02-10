import React from 'react';

const getCorrectAnswers = (question) => {
  if (question.correctAnswers) {
    return question.correctAnswers;
  }
  if (question.correctAnswer !== undefined) {
    return [question.correctAnswer];
  }
  return [];
};

const Results = ({ userAnswers, questions, onRetry }) => {
  const calculateScore = () => {
    let correctCount = 0;

    userAnswers.forEach((answers, questionIndex) => {
      const question = questions[questionIndex];
      const correctAnswers = getCorrectAnswers(question);
      if (
        answers.length === correctAnswers.length &&
        answers.every(answer => correctAnswers.includes(answer))
      ) {
        correctCount++;
      }
    });

    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };

  const score = calculateScore();

  return (
    <div className="w-full max-w-2xl mx-auto p-2 sm:p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-900">Результаты теста</h2>
      
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-4xl sm:text-5xl font-bold text-blue-700 mb-2 sm:mb-3">
          {score.percentage}%
        </div>
        <p className="text-base sm:text-lg text-gray-800 font-medium">
          Правильных ответов: {score.correct} из {score.total}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {questions.map((question, index) => {
          const correctAnswers = getCorrectAnswers(question);
          const isCorrect =
            userAnswers[index].length === correctAnswers.length &&
            userAnswers[index].every(answer => correctAnswers.includes(answer));

          return (
            <div
              key={question.id}
              className={`p-2 sm:p-4 rounded-lg border ${
                isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">{question.text}</h3>
              <p className="text-sm sm:text-base text-gray-800 mb-1.5 sm:mb-2">
                <span className="font-semibold">Ваши ответы: </span>
                {userAnswers[index]
                  .map(answerIndex => question.options[answerIndex])
                  .join(", ")}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetry}
        className="mt-6 sm:mt-8 w-full bg-blue-600 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Пройти тест заново
      </button>
    </div>
  );
};

export default Results;