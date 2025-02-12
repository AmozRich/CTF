// Challenge data
const challenges = [
  {
    id: 1,
    title: "Web Exploitation 101",
    description: "Learn the basics of web exploitation.",
    difficulty: "Easy",
    points: 100,
    flag: "CTF{w3b_3xpl01t}",
    content:
      "<h1>Web Exploitation 101</h1><p>Your first challenge is to find the hidden flag in the source code of this page.</p>",
  },
  {
    id: 2,
    title: "Cryptography Challenge",
    description: "Decrypt the message to find the flag.",
    difficulty: "Medium",
    points: 200,
    flag: "CTF{crypt0_m4st3r}",
    content: "<h1>Cryptography Challenge</h1><p>Decrypt this message: Uqnzm ku nkxkpi!</p>",
  },
  {
    id: 3,
    title: "Binary Exploitation",
    description: "Exploit the binary to get the flag.",
    difficulty: "Hard",
    points: 300,
    flag: "CTF{b1n4ry_ninja}",
    content: "<h1>Binary Exploitation</h1><p>Download the binary and find a way to exploit it.</p>",
  },
  {
    id: 4,
    title: "Forensics Investigation",
    description: "Analyze the provided file to extract the flag.",
    difficulty: "Medium",
    points: 250,
    flag: "CTF{f0r3ns1cs_pro}",
    content: "<h1>Forensics Investigation</h1><p>Examine the provided image file to find hidden information.</p>",
  },
  {
    id: 5,
    title: "Reverse Engineering",
    description: "Reverse engineer the given program to find the flag.",
    difficulty: "Hard",
    points: 350,
    flag: "CTF{r3v3rs3_3ng1n33r}",
    content: "<h1>Reverse Engineering</h1><p>Analyze the given executable and find the hidden flag.</p>",
  },
  {
    id: 6,
    title: "Network Security",
    description: "Analyze network traffic to find the flag.",
    difficulty: "Medium",
    points: 200,
    flag: "CTF{n3tw0rk_sn1ff3r}",
    content: "<h1>Network Security</h1><p>Examine the provided pcap file to find suspicious traffic.</p>",
  },
  {
    id: 7,
    title: "Steganography",
    description: "Find the hidden message in the image.",
    difficulty: "Easy",
    points: 150,
    flag: "CTF{h1dd3n_1n_pl41n_s1ght}",
    content:
      "<h1>Steganography</h1><p>There's more to this image than meets the eye. Can you find the hidden message?</p>",
  },
  {
    id: 8,
    title: "OSINT Challenge",
    description: "Use open-source intelligence to find the flag.",
    difficulty: "Medium",
    points: 250,
    flag: "CTF{0p3n_s0urc3_1nt3l}",
    content:
      "<h1>OSINT Challenge</h1><p>Use publicly available information to track down the target and find the flag.</p>",
  },
  {
    id: 9,
    title: "Advanced Cryptography",
    description: "Solve complex cryptographic puzzles.",
    difficulty: "Expert",
    points: 400,
    flag: "CTF{crypt0_w1z4rd}",
    content: "<h1>Advanced Cryptography</h1><p>This challenge involves multiple layers of encryption. Good luck!</p>",
  },
  {
    id: 10,
    title: "Final Boss",
    description: "Combine all your skills to solve this ultimate challenge.",
    difficulty: "Expert",
    points: 500,
    flag: "CTF{m4st3r_h4ck3r}",
    content: "<h1>Final Boss</h1><p>This challenge combines elements from all previous challenges. Are you ready?</p>",
  },
]

// Initialize progress
const completedChallenges = JSON.parse(localStorage.getItem("completedChallenges")) || []

// Function to update progress
function updateProgress() {
  const progressBar = document.getElementById("progressBar")
  const progressText = document.getElementById("progressText")
  const progress = (completedChallenges.length / challenges.length) * 100

  progressBar.style.width = `${progress}%`
  progressText.textContent = `${completedChallenges.length}/${challenges.length} Challenges`
}

// Function to create challenge cards
function createChallengeCards() {
  const challengeGrid = document.getElementById("challengeGrid")

  challenges.forEach((challenge) => {
    const card = document.createElement("div")
    card.className = `challenge-card ${completedChallenges.includes(challenge.id) ? "completed" : ""}`

    card.innerHTML = `
            <h2>${challenge.title}</h2>
            <p>${challenge.description}</p>
            <div class="challenge-info">
                <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                <span class="points">${challenge.points} pts</span>
            </div>
            <button class="start-button" onclick="startChallenge(${challenge.id})">Start Challenge</button>
        `

    challengeGrid.appendChild(card)
  })
}

// Function to start a challenge
function startChallenge(id) {
  const challenge = challenges.find((c) => c.id === id)
  const challengeWindow = window.open("", "_blank", "width=800,height=600")

  challengeWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${challenge.title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f0f0f0;
                }
                .challenge-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .flag-submission {
                    display: flex;
                    gap: 10px;
                }
                #flag-input {
                    flex-grow: 1;
                    padding: 5px;
                }
                button {
                    padding: 5px 10px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="challenge-content">
                ${challenge.content}
            </div>
            <div class="flag-submission">
                <input type="text" id="flag-input" placeholder="Enter flag here">
                <button onclick="checkFlag()">Submit</button>
            </div>
            <script>
                function checkFlag() {
                    const input = document.getElementById('flag-input').value;
                    window.opener.postMessage({ type: 'flagSubmission', id: ${challenge.id}, flag: input }, '*');
                }
            </script>
        </body>
        </html>
    `)
}

// Event listener for messages from challenge windows
window.addEventListener("message", (event) => {
  if (event.data.type === "flagSubmission") {
    const { id, flag } = event.data
    const challenge = challenges.find((c) => c.id === id)

    if (challenge && challenge.flag === flag) {
      alert("Correct flag! Challenge completed!")
      if (!completedChallenges.includes(id)) {
        completedChallenges.push(id)
        localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges))
        updateProgress()
        document.querySelector(`.challenge-card:nth-child(${id})`).classList.add("completed")
      }
    } else {
      alert("Incorrect flag. Try again!")
    }
  }
})

// Initialize particles.js - Assuming particlesJS library is included in the HTML file.
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
  },
  retina_detect: true,
})

// Initialize the platform
createChallengeCards()
updateProgress()

