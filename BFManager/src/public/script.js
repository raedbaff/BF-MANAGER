const socket = io("http://localhost:3000");

document.addEventListener("DOMContentLoaded", () => {

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });

  socket.on("newMatch", (match) => {
    console.log("new match recieved", match);
    addMatchToUI(match);
  });
  socket.on("matchUpdated", () => {
    console.log("match updated");
    fetchData();
  });
  socket.on("matchDeleted", () => {
    console.log("a match was deleted");
    fetchData();
  });
  socket.on("chatMessage", (data) => {
    displayMessage(data);
  });

  fetchData();
});

const addMatchToUI = (match) => {
  const matchCard = document.getElementById("parties");
  const matchElement = document.createElement("div");
  matchElement.className = "partyItem";
  matchElement.innerHTML = `
                <input type="checkbox" onchange="updateMatch(${match.id}, ${
    match.finished
  })">
        <button onclick=deleteMatch(${match.id}) class="delete-button">
  <img src="./delete.png" width="20" height="20" alt="Delete">
</button>

                <label>${match.name}</label>
                
                <strong class="${match.finished ? "finished" : "unfinished"}">${
    match.finished ? "Terminée" : "En cours ..."
  }</strong>
            `;
  matchCard.appendChild(matchElement);
};

const fetchData = () => {
  fetch("http://localhost:3000/api/match")
    .then((response) => response.json())
    .then((data) => {
      displayMatches(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const displayMatches = (matches) => {
  var unfinishedMatchesElement = document.getElementById("PartiesIncomplet");
  var unfinishedMatchesCount = 0;
  let html = "";
  const matchCard = document.getElementById("parties");

  matches.forEach((match) => {
    if (!match.finished) {
      unfinishedMatchesCount++;
    }
    html += `
                    <div class="partyItem">
                        <input type="checkbox" onchange=updateMatch(${
                          match.id
                        },${match.finished}) ${match.finished ? "checked" : ""}>
                        <button onclick=deleteMatch(${
                          match.id
                        }) class="delete-button">
  <img src="./delete.png" width="20" height="20" alt="Delete">
</button>

                        <label>${match.name}</label>
                        <strong class="${
                          match.finished ? "finished" : "unfinished"
                        }">${
      match.finished ? "Terminée" : "En cours ..."
    }</strong>
                    </div>
                `;
  });
  unfinishedMatchesElement.innerHTML = unfinishedMatchesCount;

  matchCard.innerHTML = html;
};

const CreateMatch = () => {
  const matchData = {
    name: document.getElementById("nouvellePartie").value,
  };
  console.log(matchData);
  fetch("http://localhost:3000/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchData();
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

const deleteMatch = (id) => {
  fetch(`http://localhost:3000/api/match/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  CreateMatch();
});
document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("messageInput");
  const sender = document.getElementById("sender").value
  const message={
    text:messageInput.value.trim(),
    sender
  }
  console.log(message);
  if (message.text !== "") {
    sendMessage(message);
    messageInput.value = "";
  }
});

function sendMessage(message) {
  socket.emit("chatMessage", { message });
}

function displayMessage(data) {
  const messagesContainer = document.getElementById("messages");
  const messageElement = document.createElement("div");
  
  const senderElement = document.createElement("span");
  senderElement.textContent = `${data.sender}: `;
  senderElement.classList.add("message-sender");

  const textElement = document.createElement("span");
  textElement.textContent = data.text;
  textElement.classList.add("message-text");

  messageElement.appendChild(senderElement);
  messageElement.appendChild(textElement);

  messagesContainer.appendChild(messageElement);
}


const updateMatch = (id, finished) => {
  const confirmed = confirm(
    "Are you sure you want to update the match status ?"
  );

  if (confirmed) {
    const matchData = {
      id,
      finished: !finished,
    };

    fetch("http://localhost:3000/api/match", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating match:", error);
      });
  }
};
