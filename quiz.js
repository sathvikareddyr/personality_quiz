document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const welcomeDiv = document.getElementById('welcome');
    const questionAreas = document.querySelectorAll('.qarea');
    const resultButton = document.getElementById('resultButton');
    const resultText = document.getElementById('resultText');
    const resText1 = document.getElementById('res_text1');
    let currentQuestion = 0;
    let answers = {};

    const showQuestion = (index) => {
        questionAreas.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
    };

    const shuffleAnswers = () => {
        document.querySelectorAll('.answers').forEach(answerContainer => {
            for (let i = answerContainer.children.length; i >= 0; i--) {
                answerContainer.appendChild(answerContainer.children[Math.random() * i | 0]);
            }
        });
    };

    startButton.addEventListener('click', () => {
        welcomeDiv.style.display = 'none';
        showQuestion(currentQuestion);
        shuffleAnswers();
    });

    const goToNextQuestion = () => {
        if (!answers[currentQuestion]) {
            alert("Please answer the question before proceeding.");
            return;
        }
        if (currentQuestion < questionAreas.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    };

    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', goToNextQuestion);
    });

    document.querySelectorAll('.prev').forEach(button => {
        button.addEventListener('click', goToPreviousQuestion);
    });

    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', function () {
            const parentAnswers = this.closest('.answers');
            parentAnswers.querySelectorAll('.answer').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            const questionIndex = Array.from(questionAreas).indexOf(this.closest('.qarea'));
            const value = this.getAttribute('data-value');
            answers[questionIndex] = value;
            console.log(`Question ${questionIndex + 1} answer selected: ${value}`);
        });
    });

    resultButton.addEventListener('click', () => {
        if (Object.keys(answers).length !== questionAreas.length - 1) {
            alert("Please answer all questions before viewing the results.");
            return;
        }
        let result = "Your personality type is ";
        let resText = "";
        const answerValues = Object.values(answers).map(Number);
        const total = answerValues.reduce((acc, val) => acc + val, 0);
        const average = total / answerValues.length;

        if (average < 4) {
            result += "Type A ";
            resText += "Indicates significant challenges in multiple areas, possibly indicating high levels of stress, poor coping mechanisms, difficulty in interpersonal relationships, and emotional expression. There may be significant barriers to functioning and well-being";
        } else if (average < 7) {
            result += "Type B ";
            resText += "Suggests moderate to some challenges in various aspects. The individual may have some coping skills but may struggle with certain situations or aspects of their mental health. There may be room for improvement in managing stress, relationships, or emotional expression";
        } else if (average < 9) {
            result += "Type C ";
            resText += "Reflects good to above-average mental health and coping skills. The person shows effective stress management, healthy interpersonal relationships, and adaptability to change. They may have clear goals and motivations, with a positive outlook overall";
        } else {
            result += "Type D";
            resText += "Indicates excellent mental health and strong coping mechanisms. The individual demonstrates resilience, effective problem-solving abilities, healthy emotional expression, and adaptability to challenges. They likely have well-defined values and motivations, and are generally satisfied with life";
        }
        resultText.textContent = result;
        resText1.textContent = resText;
        resultButton.style.display = 'none';
    });
});
