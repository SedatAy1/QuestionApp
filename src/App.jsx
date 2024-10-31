import React, { useState, useEffect } from "react";
import questionsData from "./questions"; // 10 soruyu içeriyor
import './style.css'; // CSS dosyasını projeye dahil ediyoruz
import './index.css';
import './App.css';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Quiz'in başlama durumu

  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    if (!quizStarted) return; // Quiz başlamadıysa zamanlayıcı çalışmasın

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 26) {
      setShowOptions(true); // 4 saniye sonra seçenekler görünecek
    }

    if (timer === 0) {
      handleNextQuestion(null); // 30 saniye sonunda otomatik ilerle
    }

    return () => clearInterval(interval);
  }, [timer, quizStarted]);

  const handleNextQuestion = (selectedOption) => {
    const newAnswer = {
      question: currentQuestion.question,
      selectedOption,
      correctOption: currentQuestion.answer, // Doğru cevap alanını güncelledik
    };
    setAnswers((prev) => [...prev, newAnswer]);

    if (currentQuestionIndex === questionsData.length - 1) {
      setQuizCompleted(true); // Son soruya geldiğinde testi bitir
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30); // Yeni soru için zamanlayıcıyı sıfırla
      setShowOptions(false); // Seçenekleri tekrar gizle
    }
  };

  const getResults = () => {
    let correctAnswers = 0;
    answers.forEach((answer) => {
      if (answer.selectedOption === answer.correctOption) correctAnswers++;
    });
    return { correct: correctAnswers, wrong: answers.length - correctAnswers };
  };

  if (!quizStarted) {
    return (
      <div className="container">
        <div className="header-banner" /> 
        <h1>Hoşgeldiniz</h1> 
        <p>-Testimiz 10 Sorudan Oluşmaktadır.</p> 
        <p>-Sorulara 30sn içinde cevap vermelisiniz.</p>
        <p>-Cevap seçenekleri 4sn sonra görünecektir.</p>
        <p>-Cevap şıklarından biri tıklandıktan ya da 30sn tamamlandıktan sonra yeni soruya geçilecektir.</p>
        <p>-Geçmiş sorulara dönülemeyecektir.</p>
        <p>-Test sonucunu sınav bitiminde görebileceksiniz.</p>
        <button id="start" onClick={() => setQuizStarted(true)}>
          Teste Başla
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    const { correct, wrong } = getResults();
    return (
      <div className="container">
        <div className="header-banner" />
        <h1>Test Tamamlandı! </h1>
        <p>Doğru Sayısı: {correct}</p>
        <p>Yanlış Sayısı: {wrong}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-banner" /> 
      <img src={currentQuestion.media} alt="Question" />
      <h1>{currentQuestion.question}</h1>

      <div>
        {showOptions ? (
          currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleNextQuestion(option)}>
              {option}
            </button>
          ))
        ) : (
          <p>Seçenekler 4 saniye sonra görünecek...</p>
        )}
      </div>
      <p>Kalan Süre: {timer} saniye</p>
    </div>
  );
};

export default App;
