let fromText = document.querySelector("#from");
let translation = document.querySelector("#to");
let fromSelect = document.querySelector("#fromLanguages");
let toSelect = document.querySelector("#toLanguages");

//Add functionality to translate button
let translateBtn = document.querySelector("button");
translateBtn.addEventListener("click", translate);

//Translate text
function translate() {
  //If text to translate is empty, make translation also empty
  if (fromText.value == "") {
    translation.value = "";
    return;
  }

  let fromLanguage = fromSelect.options[fromSelect.selectedIndex].value;
  let toLanguage = toSelect.options[toSelect.selectedIndex].value;
  let langpair = fromLanguage + "|" + toLanguage;

  //If the From and To language are the same
  if (fromLanguage == toLanguage) {
    translation.value = fromText.value;
    return;
  }

  let apiURL =
    "https://api.mymemory.translated.net/get?q=" +
    fromText.value +
    "&langpair=" +
    langpair;

  //The translation process
  getTranslation(apiURL).then(function (data) {
    translation.value = data.responseData.translatedText;
  });
}

//Using api to get text translation
let getTranslation = async (apiURL) => {
  const res = await fetch(apiURL);

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

//Turning fromText to Speech
let fromSound = document.querySelector("#fromSound");
fromSound.addEventListener("click", speakFrom);

function speakFrom() {
  let utterance = new SpeechSynthesisUtterance(fromText.value);

  utterance.lang = fromSelect.options[fromSelect.selectedIndex].value;
  speechSynthesis.speak(utterance);
}

//Turning translation text to Speech
let toSound = document.querySelector("#toSound");
toSound.addEventListener("click", speakTo);

function speakTo() {
  let utterance = new SpeechSynthesisUtterance(translation.value);

  utterance.lang = toSelect.options[toSelect.selectedIndex].value;
  speechSynthesis.speak(utterance);
}

//Copy text
let fromCopy = document.querySelector("#fromCopy");
fromCopy.addEventListener("click", copyFrom);

function copyFrom() {
    console.log(1);
  navigator.clipboard.writeText(fromText.value);
}

let toCopy = document.querySelector("#toCopy");
toCopy.addEventListener("click", copyTo);

function copyTo() {
    console.log(2);
  navigator.clipboard.writeText(translation.value);
}
