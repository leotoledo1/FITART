const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

const APIKey = "AIzaSyDfXr9kdO4QRN-qWoKUGrF65-PtsglqVZk";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}";

let userMessage = null;

const createMessageElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

const generateAPIResponse = async(incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text")

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                contents: [(
                    role: "user",
                    parts: [{ text: userMessage }]
                )]
            })
        });

        const data = await response.json();

        const apiResponse = data?.candidates[0].contents.parts[0].text;
        textElement.innerHTML = apiResponse;
    } catch {
        console.log(error)
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}

const showLoadingAnimation = () => {
    const html = ``;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    generateAPIResponse(incomingMessageDiv);
}

const handleOutGoingChat= () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if(!userMessage) return;

    const html = ``;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);   

    typingForm.reset();
    setTimeout(showLoadingAnimation, 500);
}


typingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleOutGoingChat();
})
