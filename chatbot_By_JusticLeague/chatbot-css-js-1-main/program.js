
const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});


const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};
/*
const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
};*/

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
  if (res === "There you go") {
    return;
  }
  for (let key in responseObj) {
    if (userInput.toLowerCase().includes(key)) {
      if (key.startsWith("open ")) {
        const website = responseObj[key];
        if (website) {
          showPopup(website);
        } 
        else {
          renderMessageEle("Sorry, I don't have a website URL for that.", "chatbot");
        }
      }
      break;
    }
  }
};

// Show popup window with website
const showPopup = (website) => {
  const popupWindow = window.open(website, "popupWindow");
  popupWindow.focus();
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
  return responseObj[userInput] == undefined
    ? "wanna try again ?"
    : responseObj[userInput];
};


const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

// Speech recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

const startSpeechRecognition = () => {
  recognition.start();
};

// Start speech recognition when the page loads
window.addEventListener("load", () => {
  startSpeechRecognition();
});

// Render user message when speech is recognized
recognition.addEventListener("result", (event) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  renderMessageEle(transcript, "user");
  setTimeout(() => {
    renderChatbotResponse(transcript);
    setScrollPosition();
  }, 600);
});

// Restart speech recognition when it ends
recognition.addEventListener("end", () => {
  startSpeechRecognition();
});










































































































/* hackathon group project, belongs to AYUB, JUSTIN, EDNA AND WINNIE*/