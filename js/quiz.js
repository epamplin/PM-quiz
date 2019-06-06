let $attempt = [0,0];
let $question;
let $form;
let $submit;

$(()=>{
$form = $('#quiz');
$submit = $("#sub");

$('#quiz').removeClass('hidden');
$("#score").removeClass('hidden');

//prevent default on submit and reset
$submit.click( e => e.preventDefault());

// check answer on submit
$submit.click(()=> {
    let $ans = $('input[name=answer]:checked').val();
    
    try {
        checkAnswer();
    } 
    catch (e) {
        if (e.name == 'TypeError') {
            endQuiz();
        }
    }
    
});
$question = $questions.splice(Math.floor(Math.random()*$questions.length), 1)[0];
getQuestion();
});

function getQuestion(){

    if($questions.length < 0){
        endQuiz();
    }
    displayQuestions();
}

function  displayQuestions(){
    // Stores the question.
    var question = $question.question;
    
    // Answers for the question, stored in a dictionary so answers can be displayed using a loop.
    var answers = { a: $question.a,
                    b: $question.b,
                    c: $question.c,
                    d: $question.d };
    
    // Clears radio buttons in preparation for answer selection.
    $('input[type="radio"]').prop('checked', false); 
    
    // Displays the question.
    $("#quiz_question").html(question);
    
    // Iterates over the answer choices and displays them.
    for (var answer in answers) {
        $(`label[for='answer_${answer}']`).html(answers[answer]);
        
        // If 'NA' is the answer, don't display that option. Benefits a handful of True/False questions.
        if (answers[answer] == "NA" || answers[answer] == null) {
            $(`#fieldset_${answer}`).hide();
        }
        else {
            $(`#fieldset_${answer}`).show();
        }
    }
    
    // Displays current quiz scoring.
    $('#attempted').html('Attempted: ' + $attempt[0]);
    $('#correct').html('Correct: ' + $attempt[1]);
    $('#incorrect').html('Incorrect: ' + ($attempt[0] - $attempt[1]));
}

function checkAnswer(){
    let $answer = $('input[type="radio"]:checked').val();

    if($answer !== "undefined"){
        $attempt[0]++;
        if($answer === $question.answer){ 
            $attempt[1]++;
            $question = $questions.splice(Math.floor(Math.random()*$questions.length), 1)[0];
            getQuestion();
        }
        else{
            displayQuestions();
        }
    }
}

function endQuiz(){
    const $form = $('#quiz');
    const $submit = $("input[type=submit]",$form);
    const $radio = $("input[type=radio]",$form);
    $submit.attr("disabled", "disabled");
    $radio.attr("disabled", "disabled");
    //maybe remove this before submit?
    $('#answers').append("<hr /><p class='centered'>Quiz Finished! Please refresh to play again!</p>");
}

