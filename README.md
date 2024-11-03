## Question App https://gentle-unicorn-a4c172.netlify.app
Bu proje, kullanıcılara 10 sorudan oluşan bir test sunan bir React uygulamasıdır. Her soru, belirli bir süre zarfında cevaplanmalı ve sonrasında kullanıcıya doğru ve yanlış cevap sayıları gösterilecektir.

Özellikler Teste Başla Butonu: Giriş ekranında "Teste Başla" butonu bulunur. Bu buton, id değeri "start" olarak atanmıştır ve kullanıcıya test hakkında bilgilendirme içerir. Süre Yönetimi: Her soru ekranda maksimum 30 saniye görünür. İlk 4 saniyede cevap şıkları gösterilmez. Geçmişe Dönme Yok: Kullanıcı, geçmiş sorulara geri dönemez. Sonuç Ekranı: Test bitiminde, kullanıcıya doğru ve yanlış sayıları ile her soruya verdiği cevaplar gösterilir. Proje Tasarımı Uygulamanın tasarımı 1400px genişliğinde olup, okunabilirlik ve kullanılabilirlik ön planda tutulmuştur. Sorulara ait görseller, src/pictures klasöründen alınmaktadır.

Kullanılan Teknolojiler React.js HTML, CSS, JavaScript Git & GitHub Kurulum ve Kullanım 1-Projeyi Klonlayın: git clone https://github.com/username/QuestionApp.git 2-Gerekli Bağımlılıkları Yükleyin: cd question-app npm install 3-Uygulamayı Başlatın: npm start 4-Testi Başlatın: Uygulama açıldığında, "Teste Başla" butonuna basarak teste başlayabilirsiniz.

Proje Yapısı question-app/ ├── src/ │ ├── components/ # React bileşenleri │ ├── pictures/ # Soru görselleri │ ├── App.js # Ana uygulama bileşeni │ ├── index.js # Giriş noktası │ └── ... # Diğer dosyalar ├── public/ └── README.md

Here’s the README in English:

Question App This project is a React application that presents users with a 10-question quiz. Each question must be answered within a set time, and at the end, users will see their correct and incorrect answer counts.

Features Start Test Button: The entry screen has a "Start Test" button with the id set as "start" and provides information about the test. Time Management: Each question is displayed on the screen for a maximum of 30 seconds. Answer options are hidden for the first 4 seconds. No Back Navigation: Users cannot return to previous questions. Result Screen: At the end of the test, users are shown their correct and incorrect answer counts and responses to each question. Project Design The application design is 1400px wide, prioritizing readability and usability. Images related to each question are located in the src/pictures folder.

Technologies Used React.js HTML, CSS, JavaScript Git & GitHub Installation and Usage 1-Clone the Project: git clone https://github.com/username/QuestionApp.git 2-Install Dependencies: cd question-app npm install 3-Start the Application: npm start 4-Start the Test: Once the application is open, click the "Start Test" button to begin the quiz. Project Structure question-app/ ├── src/ │ ├── components/ # React components │ ├── pictures/ # Question images │ ├── App.js # Main application component │ ├── index.js # Entry point │ └── ... # Other files ├── public/ └── README.md
