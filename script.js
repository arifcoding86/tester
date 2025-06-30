let coins = 100;
const symbols = ["cherry", "diamond", "bell", "star", "lemon"];
let musicStarted = false;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("coins").innerText = coins;

  document.getElementById("btn-spin").addEventListener("click", () => {
    if (!musicStarted) {
      const bgm = document.getElementById("bgm");
      bgm.volume = 0.2;
      bgm.play().catch(() => {});
      musicStarted = true;
    }
    spin();
  });
});

function spin() {
  if (coins < 10) {
    document.getElementById("result").innerText = "Koin tidak cukup!";
    return;
  }

  const spinSound = document.getElementById("spinSound");
  if (spinSound) {
    spinSound.pause();
    spinSound.currentTime = 0;
    spinSound.play().catch(() => {});
  }

  coins -= 10;
  const grid = document.getElementById("slotGrid");
  grid.innerHTML = "";
  let counts = {};

  for (let i = 0; i < 25; i++) {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    counts[sym] = (counts[sym] || 0) + 1;

    const img = document.createElement("img");
    img.src = "images/" + sym + ".png";
    img.alt = sym;
    img.classList.add("slot-img");
    grid.appendChild(img);
  }

  let max = Math.max(...Object.values(counts));
  let menang = false;

  if (max >= 12) {
    coins += 150;
    document.getElementById("result").innerText = "💰 JACKPOT BESAR!";
    menang = true;
  } else if (max >= 8) {
    coins += 60;
    document.getElementById("result").innerText = "🔥 Kombinasi Bagus!";
    menang = true;
  } else if (max >= 5) {
    coins += 20;
    document.getElementById("result").innerText = "Menang Kecil!";
    menang = true;
  } else {
    document.getElementById("result").innerText = "Coba lagi!";
  }

  if (menang) {
    const winSound = document.getElementById("winSound");
    if (winSound) {
      winSound.pause();
      winSound.currentTime = 0;
      winSound.play().catch(() => {});
    }
  }

  document.getElementById("coins").innerText = coins;
}

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  const stored = JSON.parse(localStorage.getItem("user"));
  if (!user || !stored || user !== stored.username) {
    alert("Silakan login dulu.");
    window.location.href = "index.html";
    return;
  }
  document.getElementById("username").innerText = stored.username;
  coins = stored.coins || 100;
  document.getElementById("coins").innerText = coins;
});
