const button = document.getElementById('button');
const audioElement = document.getElementById('audio')


function toggleButton() {
    button.disabled = !button.disabled;
}


function tellJokes(joke) {
 
    VoiceRSS.speech({
        key: 'b106561cd7b94f1799261ecb1b85be4f',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}


// get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit'
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellJokes(joke);
        toggleButton();
    } catch(error) {
        console.log('whoops', error)
    }


}


// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)
