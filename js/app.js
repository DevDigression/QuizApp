const quizQuestions = {
	questions: 
	[
	{
		question: `What is the oldest continuously-inhabited city founded by Europeans in the region that would become the United States?`, 
		answers: [`Plymouth, Massachusetts`, `Philadelphia, Pennsylvania`, `Jamestown, Virginia`, `St. Augustine, Florida`],
		correctAnswer: `St. Augustine, Florida`
	}, 
	{
		question: `Who wrote the pamphlet <em>Common Sense</em>, which influenced the colonists' movement for independence from Britain?`,
		answers: [`Benjamin Franklin`, `Thomas Paine`, `John Locke`, `Thomas Jefferson`],
		correctAnswer: `Thomas Paine`
	},
	{
		question: `Which of the following colonies was NOT founded by religious dissidents?`,
		answers: [`Rhode Island`, `Pennsylvania`, `Virginia`, `Maryland`],
		correctAnswer: `Virginia`
	},
	{
		question: `Who became President when Abraham Lincoln was assassinated?`,
		answers: [`Andrew Johnson`, `James Buchanan`, `Rutherford B. Hayes`, `Hannibal Hamlin`],
		correctAnswer: `Andrew Johnson`
	},
	{
		question: `What was the purpose of the Seneca Falls Convention of 1848?`,
		answers: [`to address the rights of women`, `to demand an immediate end to slavery`, `to contest the election of James K. Polk`, `to sign a treaty ending the Mexican-American War`],
		correctAnswer: `to address the rights of women`
	},
	{
		question: `The "Shot Heard 'Round the World" in Ralph Waldo Emerson's poem refers to`,
		answers: [`the beginning of the land grab in the Oklahoma territory`, `the assassination of Abraham Lincoln`, `the firing at Fort Sumter`, `the battle fought at Lexington and Concord`],
		correctAnswer: `the battle fought at Lexington and Concord`
	},
	{
		question: `Which of the following was NOT a major business magnate of the Gilded Age?`,
		answers: [`John D. Rockefeller`, `Rutherford B. Hayes`, `John P. Morgan`, `Andrew Carnegie`],
		correctAnswer: `Rutherford B. Hayes`
	},
	{
		question: `Which of the following was NOT a figure involved in the abolitionist movement?`,
		answers: [`Frederick Douglass`, `Sojourner Truth`, `John C. Calhoun`, `William Lloyd Garrison`],
		correctAnswer: `John C. Calhoun`
	},
	{
		question: `Which figure was most closely aligned with education reform?`,
		answers: [`William Howard Taft`, `Frances Willard`, `Horace Mann`, `Dorothea Dix`],
		correctAnswer: `Horace Mann`
	},
	{
		question: `Which figure ran as both a Populist Party and Democratic Party candidate for President in the Gilded Age?`,
		answers: [`William Howard Taft`, `Franklin Pierce`, `William Jennings Bryan`, `Grover Cleveland`],
		correctAnswer: `William Jennings Bryan`
	}
	],
	currentQuestion: 0,
	correctCount: 0
};

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
	nextQuestion();
	$("input").on("click", function() {
	$(".answer-choice").removeClass("selected");
	$(this).closest(".answer-choice").addClass("selected");
}); 
	$("#questionText").html(quizQuestions.questions[quizQuestions.currentQuestion].question);
	$("#question-form label").each(function(index) {
	$(this).find("input").attr("value", quizQuestions.questions[quizQuestions.currentQuestion].answers[index]);
	$(this).find("input").prop("checked", false);
	$(this).find(".answerChoice").text(quizQuestions.questions[quizQuestions.currentQuestion].answers[index]);
});
	$("#question-count").html(`${quizQuestions.currentQuestion + 1} / ${quizQuestions.questions.length}`);
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
	let isCorrect = quizQuestions.questions[quizQuestions.currentQuestion].correctAnswer;
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
	if (quizQuestions.currentQuestion === quizQuestions.questions.length) {
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
		${quizQuestions.correctCount} out of ${quizQuestions.questions.length} questions correct!`);
	if (quizQuestions.correctCount === quizQuestions.questions.length) {
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
}

function handleQuiz() {
	startQuiz();
	handleSubmit();
}

$(handleQuiz);