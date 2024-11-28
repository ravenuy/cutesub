const timeText = document.getElementById("timeText");

// emoteges
const emotes = {
    "INSANE": "01HPRH2DT00000X4ZG70YHEZHT",
    "OhShit:": "01F12P9KYG0009V7MP006J8KRF",
    "WidePogCrazy:": "01G4ZHV228000B2BBGEQH5KFJK",
    "HOLY:": "01GFW1BAK80001VXKTCH0VEANC",
    "WAHOO:": "01J5PXJXQG000CDPBQWFAR9ZR4",
    "CutePog:": "01HAGQA0VR000CK4GBCA21BZ37",
    "83:": "01HB7ZMVZR00072K8QAE93K1NP"
};

let totalSeconds = 0;
let endingTime = new Date(Date.now());
endingTime = timeFunc.addHours(endingTime, initialHours);
endingTime = timeFunc.addMinutes(endingTime, initialMinutes);
endingTime = timeFunc.addSeconds(endingTime, initialSeconds);

let countdownEnded = false;
let time;

// the cumtdown
const getNextTime = () => {
    let currentTime = new Date(Date.now());
    let differenceTime = endingTime - currentTime;
    time = `${timeFunc.getHours(differenceTime)}:${timeFunc.getMinutes(differenceTime)}:${timeFunc.getSeconds(differenceTime)}`;
    if (differenceTime <= 0) {
        clearInterval(countdownUpdater);
        countdownEnded = true;
        time = "00:00:00";
    }
    timeText.innerText = time;
};

let countdownUpdater = setInterval(() => {
    getNextTime();
}, 100);


// add time and pop the time added and the emotege
const addTime = async (time, s) => {
    endingTime = timeFunc.addSeconds(time, s);
    if (!(maxHours == 0 && maxMinutes == 0 && maxSeconds == 0)) {
        let maxTime = timeFunc.getMilliseconds(new Date(Date.now()), maxHours, maxMinutes, maxSeconds);
        if (endingTime.getTime() > maxTime.getTime()) endingTime = maxTime;
    }

    
    let addedTime = document.createElement("p");
    addedTime.classList = "addedTime";
    addedTime.innerText = `+${s}s`;
    document.body.appendChild(addedTime);
    addedTime.style.display = "block";
    await sleep(50);

    
    const leftPosition = `${randomInRange(35, 65)}%`;
    const topPosition = `${randomInRange(15, 40)}%`;
    addedTime.style.left = leftPosition;
    addedTime.style.top = topPosition;
    addedTime.style.opacity = "1";

   
    const emoteURL = getRandomEmoteURL();
    let emoteImg = document.createElement("img");
    emoteImg.src = emoteURL;
    emoteImg.classList = "emoteImage";
    document.body.appendChild(emoteImg);

    
    emoteImg.style.left = `${addedTime.offsetLeft + addedTime.offsetWidth + 10}px`; 
    emoteImg.style.top = addedTime.style.top; 

    emoteImg.style.opacity = "1";
    await sleep(50);

  
    addedTime.style.opacity = "0";
    emoteImg.style.opacity = "0";
    await sleep(1500);
    addedTime.remove();
    emoteImg.remove();
};

// random the emote1
function getRandomEmoteURL() {
    const emoteKeys = Object.keys(emotes); 
    const randomEmote = emoteKeys[Math.floor(Math.random() * emoteKeys.length)];
    const emoteID = emotes[randomEmote];
    return `https://cdn.7tv.app/emote/${emoteID}/3x.webp`; // 
}




// button stuff delete after
document.getElementById('addTimeBtn').addEventListener('click', () => {
    addTime(endingTime, 120); 
});
