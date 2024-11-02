import React, { useState, useEffect } from "react";
import questionsData from "./questions"; // 10 soruyu içeriyor
import './style.css'; // Genel stil dosyası
import './index.css';
import './App.css'; // Sayfa düzeni için CSS dosyası

// Ana uygulama bileşeni
const App = () => {
  // State tanımlamaları
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Geçerli sorunun indeksi
  const [showOptions, setShowOptions] = useState(false); // Şıkların görünürlüğü
  const [timer, setTimer] = useState(30); // Geri sayım sayacı (saniye)
  const [answers, setAnswers] = useState([]); // Kullanıcı cevapları
  const [quizCompleted, setQuizCompleted] = useState(false); // Quiz tamamlandı durumu
  const [quizStarted, setQuizStarted] = useState(false); // Quiz başlama durumu
  
  // Mevcut soru verisini alır
  const currentQuestion = questionsData[currentQuestionIndex];

  // Zamanlayıcı ve şıkların görünme süresini yöneten efekt
  useEffect(() => {
    if (!quizStarted) return; // Quiz başlamadıysa zamanlayıcı çalışmaz

    // Her saniye geri sayımı günceller
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // 4 saniye sonra şıkları göster
    if (timer === 26) {
      setShowOptions(true);
    }

    // 30 saniye sonunda otomatik olarak sonraki soruya geç
    if (timer === 0) {
      handleNextQuestion(null); // Şık seçilmediyse null gönder
    }

    return () => clearInterval(interval); // Her render sonrası interval'i temizler
  }, [timer, quizStarted]);

  // Sonraki soruya geçiş ve kullanıcı cevabını kaydetme fonksiyonu
  const handleNextQuestion = (selectedOption) => {
    // Aynı soruyu iki kez eklemeyi önler
    if (answers.some(answer => answer.question === currentQuestion.question)) return;

    // Kullanıcı cevabını kaydeder
    const newAnswer = {
      question: currentQuestion.question,
      selectedOption,
      correctOption: currentQuestion.answer,
    };
    setAnswers((prev) => [...prev, newAnswer]);

    // Son soruysa testi tamamla, değilse bir sonraki soruya geç
    if (currentQuestionIndex === questionsData.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30); // Yeni soru için zamanı sıfırla
      setShowOptions(false); // Şıkları gizle
    }
  };

  // Test sonucu (doğru ve yanlış cevap sayısını) hesaplayan fonksiyon
  const getResults = () => {
    let correctAnswers = 0;
    answers.forEach((answer) => {
      if (answer.selectedOption === answer.correctOption) correctAnswers++;
    });
    return { correct: correctAnswers, wrong: answers.length - correctAnswers };
  };

  // Cevap anahtarı için detaylı sonuçları hazırlayan fonksiyon
  const getDetailedResults = () => {
    return answers.map((answer) => {
      const isCorrect = answer.selectedOption === answer.correctOption;
      const isSkipped = answer.selectedOption === null;
      
      return {
        question: answer.question,
        selectedOption: answer.selectedOption,
        correctOption: answer.correctOption,
        isCorrect,
        isSkipped,
      };
    });
  };

  // Quiz başlamamışsa giriş ekranını göster
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

  // Quiz tamamlandığında sonuçları ve cevap anahtarını gösterir
  if (quizCompleted) {
    const { correct, wrong } = getResults(); // Sonuç verisi
    const detailedResults = getDetailedResults(); // Cevap anahtarı

    return (
      <div className="container">
        <div className="header-banner" />
        <h1>Test Tamamlandı! </h1>
        <p>Doğru Sayısı: {correct}</p>
        <p>Yanlış Sayısı: {wrong}</p>

        <h2>Cevap Anahtarı:</h2>
        <div className="answer-key">
          {detailedResults.map((result, index) => (
            <div key={index} className={`answer-item ${result.isCorrect ? "correct" : result.isSkipped ? "skipped" : "incorrect"}`}>
              <p><strong>Soru {index + 1}:</strong> {result.question}</p>
              <p>Seçilen Cevap: {result.selectedOption || "Boş Bırakıldı"}</p>
              {!result.isCorrect && (
                <p>Doğru Cevap: {result.correctOption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Test devam ederken soru, şıklar ve geri sayımı gösterir
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

// Uygulama bileşenini dışa aktarır
export default App;
