const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")


const questions = [

    {
        question: "Covid-19 é um vírus?",
        answers: [
          { text: "Não", correct: false },
          { text: "Sim", correct: true }
        ]
      },
  
  {
    question: "Qual é o agente causador da COVID-19?",
    answers: [
      { text: "Influenza", correct: false },
      { text: "HIV", correct: false },
      { text: "SARS-CoV-2", correct: true },
      { text: "Ebola", correct: false }
    ]
  },
  {
    question: 'Qual é o objetivo da rastreabilidade de contatos na prevenção da COVID-19?"',
    answers: [
      { text: 'Identificar e isolar os casos positivos', correct: true },
      { text: 'Aumentar a propagação da doença', correct: false },
      { text: 'Erradicar a pobreza', correct: false },
      { text: "Promover aglomerações de pessoas", correct: false }
    ]
  },
  {
    question: 'Como a COVID-19 é principalmente transmitida?',
    answers: [
      { text: 'Através de objetos contaminados', correct: false },
      { text: 'Pela ingestão de alimentos crus', correct: false },
      { text: 'Pelas plantas', correct: false },
      { text: 'Pelo contato próximo com pessoas infectadas', correct: true }
    ]
  },
  {
    question: 'Usar a máscara facial é uma médida contra a covid?',
    answers: [
      { text: 'Não', correct: false },
      { text: 'Sim', correct: true },
       
    ]
  },
  {
    question: 'Quais grupos de pessoas têm maior risco de complicações graves por COVID-19?',
    answers: [
      { text: 'Crianças saudáveis', correct: false },
      { text: 'Adolescentes', correct: false },
      { text: 'Idosos e pessoas com condições médicas subjacentes', correct: true },
      { text: 'Atletas e bailarinos', correct: false },
    ]
  },
  {
    question: "Qual das seguintes opções não é uma vacina contra a COVID-19 aprovada?",
    answers: [
      { text: " Pfizer-BioNTech", correct: false },
      { text: "Moderna", correct: false },
      { text: " AstraZeneca", correct: false },
      { text: "Vacina da Raiva", correct: true }
    ]
  },
  {
    question: "O que é o distanciamento social?",
    answers: [
      { text: "Abraçar e apertar as mãos com frequência", correct: false },
      { text: "Manter pelo menos 2 metros de distância de outras pessoas", correct: true },
      { text: "Realizar reuniões sociais em locais fechados", correct: false },
      { text: "Ignorar as diretrizes de saúde pública", correct: false }
    ]
  },
  {
    question: "Qual é a importância da imunização de rebanho na luta contra a COVID-19?",
    answers: [
      { text: "Não tem impacto na pandemia", correct: false },
      { text: "Ajuda a prevenir novas infecções e protege a comunidade", correct: true },
      { text: "Aumenta o risco de infecção", correct: false },
      { text: "Causa a mutação do vírus", correct: false }
    ]
  },
  {
    question: "O que são as variantes do SARS-CoV-2?",
    answers: [
      { text: "Novos nomes para medicamentos", correct: false },
      { text: "Tipos diferentes de coronavírus ", correct: false },
      { text: "Marcas de máscaras faciais ", correct: false },
      { text: "Mutações do vírus que podem afetar sua transmissão e gravidade", correct: true }
    ]
  },
  
]

let currentQuestionIndex = 0
let totalCorrect = 0

 //inicializações

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

//start
function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add()
    totalCorrect++
  } else {
    document.body.classList.add() 
  }
// adiciona a cor as alternativas certas e erradas
  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}
//calculo de respostas
function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  

  // verificação de respostas
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Parabéns!! :)"
      break
    case (performance >= 70):
      message = "Quase lá :-) "
      break
    case (performance >= 50):
      message = "Pode melhorar!"
      break
    default:
      message = "Acreditamos que estudar seja uma boa opção pra você :-)"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


