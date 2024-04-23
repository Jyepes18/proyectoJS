const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    text: "¿Cuál es tu color favorito?",
    options: ["rojo", "azul", "verde", "amarillo", "otro"]
  },

  {
    text: "¿Cuántos años tienes?",
    options: []
  },

  {
    text: "¿Cuál es tu serie favorita?",
    options: ["la casa de papel", "quería gente blanca", "la ley y el orden"]
  },

  {
    text: "¿Cuál fue la época más linda de tu vida?",
    options: ["el colegio", "el bachillerato", "la universidad", "el trabajo"]
  }
];

function presentQuestions() {
  let answers = [];

  function askQuestion(index) {
    if (index < questions.length) {
      const question = questions[index];
      rl.question(`${question.text} (${question.options.join(', ')}): `, (answer) => {
        // Convertir la respuesta a minúsculas
        answer = answer.toLowerCase();
        if (validateAnswer(answer, question)) {
          answers.push(answer);
          askQuestion(index + 1);
        } else {
          console.log("Respuesta inválida. Por favor, inténtalo de nuevo.");
          askQuestion(index);
        }
      });
    } else {
      rl.close();
      showSummary(answers);
    }
  }

  askQuestion(0);
}

function validateAnswer(answer, question) {
  if (question.options.length === 0) {
    // Validar si es un número
    return !isNaN(answer);
  } else {
    // Validar si está dentro de las opciones en minúsculas
    return question.options.includes(answer);
  }
}

function showSummary(answers) {
  console.log("\n--- Resumen de Respuestas ---");
  questions.forEach((question, index) => {
    console.log(`${question.text}: ${answers[index]}`);
  });
}

presentQuestions();
