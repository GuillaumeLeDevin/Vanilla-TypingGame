const APICALL = 'http://api.quotable.io/random';

const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');

const sentenceModel = document.querySelector('.sentenceModel');
const mySentence = document.querySelector('.mySentence');

let remainingTime = 60;
let score = 0;
let sentenceScore;

timeDisplay.innerText = `Time: ${remainingTime}`;
scoreDisplay.innerText = `Score: ${score}`;

let timer = setInterval(time, 1000);

function time(){
    remainingTime--;
    timeDisplay.innerText = `Time: ${remainingTime}`;
    scoreDisplay.innerText = `Score: ${score}`;

    if(time === 0){
        clearInterval(timer);
    }
}

//Take a sentence from the API

async function newSentenceDisplay(){

    const call = await fetch(APICALL);
    const results = await call.json();
    // console.log(results);
    const sentence = results.content;

    sentenceScore = sentence.length;

    sentenceModel.innerHTML = '';

    sentence.split('').forEach(charac => {

        const characSpan = document.createElement('span');
        characSpan.innerText = charac;
        sentenceModel.appendChild(characSpan);

    })

    mySentence.value = null;

}

newSentenceDisplay();

mySentence.addEventListener('input', () => {

    const sentenceModelTab = sentenceModel.querySelectorAll('span');
    const mySentenceTab = mySentence.value.split('');

    let correct = true;

    sentenceModelTab.forEach((characSpan, index) => {

        const charactere = mySentenceTab[index];

        if(charactere == null){
            characSpan.classList.remove('correct');
            characSpan.classList.remove('wrong');
            correct = false;
        }
        else if(charactere === characSpan.innerText){
            characSpan.classList.add('correct');
            characSpan.classList.remove('wrong');
        }
        else {
            characSpan.classList.remove('correct');
            characSpan.classList.add('wrong');
            correct = false;
        }

    })

    if(correct){
        newSentenceDisplay();
        score += sentenceScore;
    }

})