/*- Questions -*/
const questions = [
  {
    id: 'qgrid1',
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    id: 'qgrid2',
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    id: 'qgrid3',
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    id: 'qgrid4',
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]








/*- Get Elements by ID -*/
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('questionElement');
const Options = document.getElementById('options');
const counterBox = document.getElementById("counter");
const resultBtn = document.getElementById("resultBtn");
const resultbox = document.getElementById("results");
const q1 = document.getElementById("qgrid1");
const q2 = document.getElementById("qgrid2");
const q3 = document.getElementById("qgrid3");
const q4 = document.getElementById("qgrid4");
const leaderboard = document.getElementById("leaderboardGrid");
const leaderboardBtn  = document.getElementById("leaderboardBtn");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");



let randomisedOrder, currentIndex, counter;
let selectedCounter = 0;







// Add event listeners for the start button and the next question button
startBtn.addEventListener('click', start)
nextBtn.addEventListener('click', () => {
  currentIndex++;
  resetState();
  displayQuestion(randomisedOrder[currentIndex]);
})







/**
* Function that gets called when the user clicks the start button
* resets values to the appropriate state and lauches the quiz
* @name start()
*/
function start() {

  // Reset the colour of the leaderboard answers back to red
  q1.style.backgroundColor = "#ffad99";
  q2.style.backgroundColor = "#ffad99";
  q3.style.backgroundColor = "#ffad99";
  q4.style.backgroundColor = "#ffad99";

  // Reset the selected counter
  selectedCounter = 0;

  // Hide the result button if not already doing so
  if (!resultBtn.classList.contains('hide'))
  {
    resultBtn.classList.add('hide');
  }

  // hide the start button
  startBtn.classList.add('hide');

  // Randomise the order of the questions
  randomisedOrder = questions.sort(() => Math.random() - .5);

  currentIndex = 0;
  counter = 0;

  // show a question
  questionContainer.classList.remove('hide');


  //call resetState and show question with the current question index
  resetState();
  displayQuestion(randomisedOrder[currentIndex]);
}












/**
* Function that presents the visual information (question, answers) within HTML elements to the user and allows them to go to the results page
* @name displayQuestion()
*/
function displayQuestion(question) 
{

  // Display the text to the question
  questionElement.innerText = question.question;


  // for every answer correlated to the question
  question.answers.forEach(answer => 
  {
    // create button
    const button = document.createElement('button');

    // Set the text of the button to the answer
    button.innerText = answer.text;
    button.classList.add('btn');
    button.id = question.id;

    // If the multiple choice option is correct answer set the button to correct 
    if (answer.correct)
    {
      button.dataset.correct = answer.correct;
     
    }

    //display the the users score
    counterBox.innerText = String("Score: " + counter +  "/" + currentIndex);  

    // add the question id to the button / options class list
    button.classList.add(question.id);

    // add an event listener for if the user selects this multiple choice option
    button.addEventListener('click', checkAnswer);
  
    // add it to the div containing and existing buttons
    Options.appendChild(button);
  })


}




/**
* Function that deals with whether or not a users answer is correct (visual queus, score counter etc)
* @name checkAnswer()
*/
function checkAnswer(e) {
 
  // If statement makes sure only one button can be selected with each question
  if ((selectedCounter == 0 && currentIndex == 0) ||(selectedCounter == 1 && currentIndex == 1) || (selectedCounter == 2 && currentIndex == 2) || (selectedCounter == 3 && currentIndex == 3)) 
  {
    // Increment the selected counter
    selectedCounter++;

    // Get the users answer button
    const usersChoice = e.target;


    // Change the users answer button border visuals
    usersChoice.style.border = "10px yellow solid";
      



    //If...else if to change the colour of the background to green if the user got the correct answer for the results page
    if (usersChoice.classList.contains("qgrid1")){
      q1.innerText = usersChoice.innerText;

      // If the users choice is the same as the correct answer then change the background colour for the results page
      if (q1.innerText == answer1.innerText)
      {
        q1.style.backgroundColor = "#b3ffb3"; // green
      }
    } 
    else if (usersChoice.classList.contains("qgrid2"))
    {
    q2.innerText = usersChoice.innerText;
    
    // If the users choice is the same as the correct answer then change the background colour for the results page
    if (q2.innerText == answer2.innerText)
    {
      q2.style.backgroundColor = "#b3ffb3"; // green
    }
    } 
    else if (usersChoice.classList.contains("qgrid3"))
    {
    q3.innerText = usersChoice.innerText;

    // If the users choice is the same as the correct answer then change the background colour for the results page
    if (q3.innerText == answer3.innerText)
    {
      q3.style.backgroundColor = "#b3ffb3"; // green
    }

    } 
    else if (usersChoice.classList.contains("qgrid4"))
    {
    q4.innerText = usersChoice.innerText;

    // If the users choice is the same as the correct answer then change the background colour for the results page
    if (q4.innerText == answer4.innerText)
    {
      q4.style.backgroundColor = "#b3ffb3"; // green
    }
  } 


  // For every child element (button) of the the button div 
  Array.from(Options.children).forEach(button => {


  // Remove correct and wrong from their classlist
  button.classList.remove('correct');
  button.classList.remove('wrong');
  

  // if the buttons is correct add 'correct' to its classlist else add 'wrong'
  if (button.dataset.correct) 
  {
    button.classList.add('correct');
   

  } else 
  {
    button.classList.add('wrong');
  }
  })




  // Increment the users score if the selected button was correct
  if (usersChoice.classList.contains('correct'))
  {
    counter++;
  }

  // Allow the user to see the the next button so long as it is not the last question
  if ((currentIndex + 1) < randomisedOrder.length) {
   
    nextBtn.classList.remove('hide');

  } 
  else 
  {
    // Change the start button to restart and allow the user to view it
    startBtn.innerText = 'Restart';
    startBtn.classList.remove('hide');
    currentIndex++;
    counterBox.innerText = String("Score: " + counter +  "/" + currentIndex); 
    
    

    // Call function to update the leaderboard
    updateLeaderboard(counter);

    
    // An event listener for the resultsButton so that the user goes to the results page if the button is clicked
    resultBtn.classList.remove('hide');
    resultBtn.addEventListener('click', viewResults);
   
  }

}
}










/**
* Sets the visuals back to a state where the question is unanswered
* @name resetState()
*/
function resetState() {

  // resets the colour differences caused by the users answer being correct or incorrect
  document.body.classList.remove('correct');
  document.body.classList.remove('wrong');

  // hides the next button so the user must cannot skip questions
  nextBtn.classList.add('hide');

  // remove every button
  while (Options.firstChild) 
  {
    Options.removeChild(Options.firstChild);
  }
}










/**
* Function that deals with the visuas of showing the results to the user
* @name viewResults()
*/
function viewResults()
{
  // add the questions and answerbuttons
  questionElement.classList.add('hide');
  Options.classList.add('hide');


  // hide the result button and show the results
  resultBtn.classList.add('hide');
  resultbox.classList.remove("hide");


  // An event listener to go to the leaderpoard page if the button is clicked
  leaderboardBtn.classList.remove('hide');
  leaderboardBtn.addEventListener('click', viewLeaderboard);

  //An event listener to go to reset the result elements
  startBtn.addEventListener('click', resetResult);

}







/**
* Function that deals with resetting the visuals from the users results
* @name resetResult()
*/
function resetResult()
{

  resultbox.classList.add("hide")
  questionElement.classList.remove('hide')
  Options.classList.remove('hide')
  leaderboardBtn.classList.add('hide')


}








/**
* Function that deals with the visuals of showing the leaderboard to the user
* @name viewLeaderboard()
*/
function viewLeaderboard()
{
  // Hides leaderboard button and the results
  leaderboardBtn.classList.add('hide')
  resultbox.classList.add('hide')


  leaderboard.style.display="grid";

  // adds an event listener so that when restart is clicked it resets the visuals
  startBtn.addEventListener('click', resetLeaderboard)

}







/**
* Function that stops displaying the leaderboard
* @name resetLeaderboard
*/
function resetLeaderboard()
{
leaderboard.style.display = "none";

}








/**
* Function that returns the value store within a cookie
* @name getCookie()
* @param    {String} cookie_name                          Name of the cookie
* @return   {String} c.substring(name.length, c.length)   Value stored in the cookie
*/
function getCookie(cookie_name)
{
  //set variables
  var name = cookie_name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  //For all the components in the ca 
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while(c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if(c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}







/**
* Function that takes the neccessarry values to create a cookie with an expiry date
* @name setCookie()
* @param    {String} name_    Name of the cookie
* @param    {String} value    Value to store within the cookie
* @param    {Int}    expiry   The amount of days until the cookie should expire (be deleted)
*/
function setCookie(name_ ,value ,expiry )
{
  var d = new Date();
  d.setTime(d.getTime() + (expiry*24*60*60*1000));
  var expires = "expires ="+ d.toUTCString();
  document.cookie = name_ + "=" + value + ";" + expires;
}
















/**
* Function that checks if 5 cookies exist corresponding to the leaderboard
* if they dont already exist then they are created and filled in with blank values
* @name checkCookie()
*/
function checkCookie() 
{

  // Gets the 5 records to the cookies if they exist
  const records = [ getCookie("record0"), getCookie("record1"), getCookie("record2"), getCookie("record3"), getCookie("record4") ];

  // If they do not exist then set a cookie and fill it in with blank values
  for (i=0; i < records.length; i++)
  {
    if (records[i] == "")
    {
      records[i] = "_____,0" ;
      setCookie("record" + i, records[i] , 365);

    }
  }
}













/**
* Function that checks and updates the leaderboard if the user scored high enough
* @name     updateLeaderboard()
* @param    {Int} currentScore   The users Score at the end of the quiz
*
*/
function updateLeaderboard(currentScore){

  // Declare and initialise some variables
  let flag = 0;
  let index;
  let name;
  let newRecord = "_____,0";

  // Get the values store in the cookies in an array
  const records = [ getCookie("record0"), getCookie("record1"), getCookie("record2"), getCookie("record3"), getCookie("record4") ];
  


    // For all the values stored within the array get the index of where the current users's score lies
    for (i=0; i < records.length; i++)
    {

        const myArray = records[i].split(',');

        // if the flag variable is zero and the currenct score is greater than the score at the index 'i' set the index
        // and get details off the user
        if (flag == 0 && currentScore >= parseInt(myArray[1]))
        {
            index = i;
            flag = 1;

            while(name == "" || name == null) 
            {
                name = prompt("Congratulations, you have made it onto the leaderborad! Please enter your name:", "");
            }

            // set the new record 
            newRecord = name + "," + currentScore;

        }


    }
    


// if the new record has been filled out / the users score should be  placed on the leaderboard
// delete record in fifth and insert the new record where it should go in the array
  if (newRecord != "_____,0"){
    
    //print the new array to the console (this is used for testing etc)
    console.log(records);
    
    // Pop the fifth record
    records.pop();
  
    // Set up two array, one before the insertion index and one after
    const one = records.slice(0, (index));
    const two = records.slice(index, records.length)
   

   // Push the record onto the first array
   one.push(newRecord);
 

   //Concatneate the arrays
   const three = one.concat(two);
 
    //print the new array to the console (this is used for testing etc)
    console.log(three);
 

    // Loop round the records and change the value to the new array
    for (i=0; i < 5; i++)
    {
      document.cookie = "record" + i + "="+ three[i] + ";";
    }
}


    //loop round the cookies to update the values within the visual leaderboard
    for (i=0; i < 5; i++)
    {   
      const myArray = getCookie("record" + (i)).split(',');
        
    
      console.log(myArray);

      //Insert the values into the leaderboard
      document.getElementById(("p" + i)).innerHTML = myArray[0];
      document.getElementById(("hs" + i)).innerHTML = myArray[1];

    }

}






