const button = document.getElementById('talk');
const userSpeech = document.getElementById('userSpeech');
const marsReply = document.getElementById('marsReply');

const askName = ["My name is Mars", "I'm Mars"];
const greetings = ["I'm good, you little piece of love", "Doing good, homeboy"];
const place = ["I'm from Mars planet", "I'm from your neighbor planet Mars"];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {
    userSpeech.textContent = 'Voice is activated, you can speak to microphone';
}

recognition.onresult = (event) => {
    const currentText = event.resultIndex;

    const transcript = event.results[currentText][0].transcript;

    userSpeech.textContent = transcript;

    speakOutLoud(transcript);
}

// Add the event listener to the button
button.addEventListener('click', () => {
    recognition.start();
});

function speakOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    let replyText;

    if (message.includes('how are you')) {
        replyText = greetings[Math.floor(Math.random() * greetings.length)];
        marsReply.textContent = `Replied: ${replyText}`;
        speech.text = replyText;
    } else if (message.includes('what is your name')) {
        replyText = askName[Math.floor(Math.random() * askName.length)];
        marsReply.textContent = `Replied: ${replyText}`;
        speech.text = replyText;
    } else if (message.includes("where are you come from")) {
        replyText = place[Math.floor(Math.random() * place.length)];
        marsReply.textContent = `Replied: ${replyText}`;
        speech.text = replyText;
    } else {
        speech.text = "I don't know, what are you saying";
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}