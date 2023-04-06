let jsonData;

let userInput;
let systemResponse;

function preload() {
  httpGet("/loadJSON", "json", (data) => {
    jsonData = data;
    checkJSON();
  });
}

function checkJSON() {
  if (!Array.isArray(jsonData)) {
    jsonData = [];
  }
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 5; i++) {
    let item = jsonData[i];
    console.log(item.role, item.content);
  }

  userInput = createInput();
  userInput.position(20, 20);

  systemResponse = createInput();
  systemResponse.position(20, 50);

  let sendButton = createButton("Send");
  sendButton.position(20, 80);
  sendButton.mousePressed(addToJSON);
}
function draw() {
  background(220);
  rect(100, 100, 100, 100);
}
function addToJSON() {
  let userInputValue = userInput.value();
  let systemResponseValue = systemResponse.value();

  let newItem = {
    role: "user",
    content: userInputValue,
  };
  jsonData.push(newItem);
  newItem = {
    role: "system",
    content: systemResponseValue,
  };
  jsonData.push(newItem);

  httpPost(
    "/saveJSON",
    "json",
    jsonData,
    (result) => {
      console.log("File saved:", result);
    },
    (error) => {
      console.log("Error saving file:", error);
    }
  );
}
