const quizQuestions = {
	questions: 
	[
	{
		question: `What is the oldest continuously-inhabited city founded by Europeans in the region that would become the United States?`, 
		answers: [`Plymouth, Massachusetts`, `Philadelphia, Pennsylvania`, `Jamestown, Virginia`, `St. Augustine, Florida`],
		correctAnswer: `St. Augustine, Florida`,
		previouslyChosen: false
	}, 
	{
		question: `Who wrote the pamphlet <em>Common Sense</em>, which influenced the colonists' movement for independence from Britain?`,
		answers: [`Benjamin Franklin`, `Thomas Paine`, `John Locke`, `Thomas Jefferson`],
		correctAnswer: `Thomas Paine`,
		previouslyChosen: false
	},
	{
		question: `Which of the following colonies was NOT founded by religious dissidents?`,
		answers: [`Rhode Island`, `Pennsylvania`, `Virginia`, `Maryland`],
		correctAnswer: `Virginia`,
		previouslyChosen: false
	},
	{
		question: `Who became President when Abraham Lincoln was assassinated?`,
		answers: [`Andrew Johnson`, `James Buchanan`, `Rutherford B. Hayes`, `Hannibal Hamlin`],
		correctAnswer: `Andrew Johnson`,
		previouslyChosen: false
	},
	{
		question: `What was the purpose of the Seneca Falls Convention of 1848?`,
		answers: [`to address the rights of women`, `to demand an immediate end to slavery`, `to contest the election of James K. Polk`, `to sign a treaty ending the Mexican-American War`],
		correctAnswer: `to address the rights of women`,
		previouslyChosen: false
	},
	{
		question: `The "Shot Heard 'Round the World" in Ralph Waldo Emerson's poem refers to`,
		answers: [`the beginning of the land grab in the Oklahoma territory`, `the assassination of Abraham Lincoln`, `the firing at Fort Sumter`, `the battle fought at Lexington and Concord`],
		correctAnswer: `the battle fought at Lexington and Concord`,
		previouslyChosen: false
	},
	{
		question: `Which of the following was NOT a major business magnate of the Gilded Age?`,
		answers: [`John D. Rockefeller`, `Rutherford B. Hayes`, `John P. Morgan`, `Andrew Carnegie`],
		correctAnswer: `Rutherford B. Hayes`,
		previouslyChosen: false
	},
	{
		question: `Which of the following was NOT a figure involved in the abolitionist movement?`,
		answers: [`Frederick Douglass`, `Sojourner Truth`, `John C. Calhoun`, `William Lloyd Garrison`],
		correctAnswer: `John C. Calhoun`,
		previouslyChosen: false
	},
	{
		question: `Which figure was most closely aligned with education reform?`,
		answers: [`William Howard Taft`, `Frances Willard`, `Horace Mann`, `Dorothea Dix`],
		correctAnswer: `Horace Mann`,
		previouslyChosen: false
	},
	{
		question: `Which figure ran as both a Populist Party and Democratic Party candidate for President in the Gilded Age?`,
		answers: [`William Howard Taft`, `Franklin Pierce`, `William Jennings Bryan`, `Grover Cleveland`],
		correctAnswer: `William Jennings Bryan`,
		previouslyChosen: false
	},
	{
		question: `Which event most immediately prompted the US to join World War I?`,
		answers: [`the Lusitania was sunk by German submarines`, `the Zimmermann Telegraph was intercepted and decoded`, `Russia withdrew from the conflict following the Bolshevik Revolution`, `Woodrow Wilson won the election of 1916`],
		correctAnswer: `the Zimmermann Telegraph was intercepted and decoded`,
		previouslyChosen: false
	},
	{
		question: `Which of the following was NOT a major business magnate of the Gilded Age?`,
		answers: [`John D. Rockefeller`, `Rutherford B. Hayes`, `John P. Morgan`, `Andrew Carnegie`],
		correctAnswer: `Rutherford B. Hayes`,
		previouslyChosen: false
	},
	{
		question: `Which of the following social programs begun during the Great Depression which still exists?`,
		answers: [`Social Security`, `Civilian Conservation Corp`, `Works Progress Administration`, `Environmental Protection Agency`],
		correctAnswer: `Social Security`,
		previouslyChosen: false
	},
	{
		question: `Who is the author of the book <em>Silent Spring</em>, which helped launch the Environmental Movement? `,
		answers: [`Rachel Carson`, `Cesar Chavez`, `Upton Sinclair`, `Betty Friedan`],
		correctAnswer: `Rachel Carson`,
		previouslyChosen: false
	},
	{
		question: `Who was the first student to be admitted to the segregated University of Mississippi?`,
		answers: [`Martin Luther King, Jr.`, `Medgar Evers`, `Harriet Beecher Stowe`, `James Meredith`],
		correctAnswer: `James Meredith`,
		previouslyChosen: false
	},
	{
		question: `Who was the first woman to serve in the Presidential Cabinet? `,
		answers: [`Eleanor Roosevelt`, `Frances Perkins`, `Geraldine Ferraro`, `Elizabeth Stanton`],
		correctAnswer: `Frances Perkins`,
		previouslyChosen: false
	},
	{
		question: `The US military was defeated by Native American forces at which of the following battles?`,
		answers: [`Sand Creek`, `Wounded Knee`, `Little Bighorn`, `Black Hills`],
		correctAnswer: `Little Bighorn`,
		previouslyChosen: false
	},
	{
		question: `Which event brought the US closest to nuclear war?`,
		answers: [`the Korean War`, `the Cuban Missile Crisis`, `the invasion of Iraq`, `the Soviet Sputnik mission`],
		correctAnswer: `the Cuban Missile Crisis`,
		previouslyChosen: false
	},
	{
		question: `Which US President served more than two terms in office?`,
		answers: [`Grover Cleveland`, `William Howard Taft`, `George Washington`, `Franklin Roosevelt`],
		correctAnswer: `Franklin Roosevelt`,
		previouslyChosen: false
	},
	{
		question: `Prior to the ratification of the Constitution, which document outlined the governmental structure of the United States?`,
		answers: [`Bill of Rights`, `Declaration of Independence`, `Articles of Confederation`, `Continental Congress`],
		correctAnswer: `Articles of Confederation`,
		previouslyChosen: false
	}
	],
	currentQuestion: 0,
	correctCount: 0
};

const questionTotal = 10;
let questionNumber;

function startQuiz () {
	$("#start-button").on("click", function(){
    changePage($(this).closest("section"));
	generateQuestion();
});
}

function changePage (page) {
	page.addClass("hidden");
    $("#question-page").removeClass("hidden");
}

function nextQuestion () {
	$("#submit").removeClass("hidden");
	$("#next").addClass("hidden");
}

function generateQuestion () {
	questionNumber = Math.floor(Math.random() * quizQuestions.questions.length);
	if (quizQuestions.questions[questionNumber].previouslyChosen) {
		generateQuestion();
	}
	nextQuestion();
	$("input").on("click", function() {
	$(".answer-choice").removeClass("selected");
	$(this).closest(".answer-choice").addClass("selected");
}); 
	$("#questionText").html(quizQuestions.questions[questionNumber].question);
	$("#question-form label").each(function(index) {
	$(this).find("input").attr("value", quizQuestions.questions[questionNumber].answers[index]);
	$(this).find("input").prop("checked", false);
	$(this).find(".answerChoice").text(quizQuestions.questions[questionNumber].answers[index]);
});
	$("#question-count").html(`${quizQuestions.currentQuestion + 1} / ${questionTotal}`);
}

function handleSubmit () {
	nextQuestion();
	$("#submit").on("click", function(event) {
	event.preventDefault();
	let answerChoice = $("input[name='answer-choice']:checked").val();
	checkAnswer(answerChoice);
});
}

function checkAnswer (answer) {  
	let isCorrect = quizQuestions.questions[questionNumber].correctAnswer;
	if (answer === isCorrect) {
	$("input").closest(":checked").parent().removeClass("selected");
	$("input").closest(":checked").parent().addClass("showCorrect");
	quizQuestions.correctCount++;
	} else {
	$("input").closest(":checked").parent().removeClass("selected");
	$("input").closest(":checked").parent().addClass("showIncorrect");
	$("form").find("input[value='"+isCorrect+"']").parent().addClass("showCorrect");
	}
	quizQuestions.currentQuestion++;
	quizQuestions.questions[questionNumber].previouslyChosen = true;
	newQuestion();
}

function newQuestion () {
	$("#submit").addClass("hidden");
	$("#next").removeClass("hidden");
	$("#next").on("click", function(event) {
	event.preventDefault();
	$(".answer-choice").removeClass("selected");
	$(".answer-choice").removeClass("showCorrect");
	$(".answer-choice").removeClass("showIncorrect");
	$("#feedback").find("h2").text("");
	if (quizQuestions.currentQuestion === questionTotal) {
	showResults();
	} else {
	generateQuestion();
	}
});
}

function showResults() {
	$("#question-page").addClass("hidden");
    $("#results-page").removeClass("hidden");
	$("#results-page").find("h1").html(`
		${quizQuestions.correctCount} out of ${questionTotal} questions correct!`);
	if (quizQuestions.correctCount === questionTotal) {
	$("#results-page").find("h2").html(`Perfect score! You are a true historian!`);
	} else if (quizQuestions.correctCount > 6) {
	$("#results-page").find("h2").html(`Nice work! You know your U.S. History!`);
	} else {
	$("#results-page").find("h2").html(`Yikes! You might want to read up on some U.S. History!`);
	}
	resetQuiz();
}

function resetQuiz () {
	$("#reset-button").on("click", function(event){
		event.preventDefault();
		changePage($(this).closest("section"));
	$(".resultsDisplay").html("");
	resetScore();
	generateQuestion();
});
}

function resetScore () {
	quizQuestions.currentQuestion = 0;
	quizQuestions.correctCount = 0;
	for (let i = 0; i < quizQuestions.questions.length; i++) {
		quizQuestions.questions[i].previouslyChosen = false;
	}
}

function handleQuiz() {
	startQuiz();
	handleSubmit();
}

$(handleQuiz);