// ====== Palabras y definiciones ======
const allWords = shuffle([
  "アイスクリーム", "バナナ", "コーヒー", "チーズ", "パン", "サンドイッチ", "ケーキ", "ジュース", "チョコレート", "ピザ",
  "ハンバーガー", "スパゲッティ", "ポテト", "サラダ", "ソーセージ", "ビール", "ワイン", "ウイスキー", "ミルク", "バター",
  "コンピューター", "スマホ", "メール", "インターネット", "カメラ", "テレビ", "ラジオ", "アプリ", "ゲーム", "タブレット",
  "パソコン", "ロボット", "プリンター", "マウス", "キーボード", "スピーカー", "ヘッドホン", "モニター", "チャット", "データ",
  "レストラン", "カフェ", "ホテル", "コンビニ", "スーパー", "ショッピングモール", "デパート", "トイレ", "エレベーター", "エスカレーター",
  "アパート", "マンション", "オフィス", "パーティー", "イベント", "コンサート", "チケット", "スポーツ", "サッカー", "バスケットボール",
  "テニス", "ゴルフ", "スキー", "スノーボード", "ランニング", "ジム", "ヨガ", "スイミング", "バイク", "ドライブ",
  "タクシー", "バス", "トラック", "トレイン", "エアコン", "クーラー", "ヒーター", "ベッド", "ソファ", "テーブル",
  "チーム", "コーチ", "マネージャー", "アイドル", "アニメ", "マンガ", "ドラマ", "シリーズ", "ヒーロー", "モンスター",
  "デザイン", "ファッション", "ブランド", "プロジェクト", "ビジネス", "マーケティング", "プレゼント", "サプライズ", "トラブル", "ラッキー"
]);

const definitions = {
  "アイスクリーム": "Ice cream", "バナナ": "Banana", "コーヒー": "Coffee", "チーズ": "Cheese", "パン": "Bread",
  "サンドイッチ": "Sandwich", "ケーキ": "Cake", "ジュース": "Juice", "チョコレート": "Chocolate", "ピザ": "Pizza",
  "ハンバーガー": "Hamburger", "スパゲッティ": "Spaghetti", "ポテト": "Potato", "サラダ": "Salad", "ソーセージ": "Sausage",
  "ビール": "Beer", "ワイン": "Wine", "ウイスキー": "Whisky", "ミルク": "Milk", "バター": "Butter",
  "コンピューター": "Computer", "スマホ": "Smartphone", "メール": "Email", "インターネット": "Internet", "カメラ": "Camera",
  "テレビ": "Television", "ラジオ": "Radio", "アプリ": "App", "ゲーム": "Game", "タブレット": "Tablet",
  "パソコン": "PC", "ロボット": "Robot", "プリンター": "Printer", "マウス": "Mouse", "キーボード": "Keyboard",
  "スピーカー": "Speaker", "ヘッドホン": "Headphones", "モニター": "Monitor", "チャット": "Chat", "データ": "Data",
  "レストラン": "Restaurant", "カフェ": "Cafe", "ホテル": "Hotel", "コンビニ": "Convenience store", "スーパー": "Supermarket",
  "ショッピングモール": "Shopping mall", "デパート": "Department store", "トイレ": "Toilet", "エレベーター": "Elevator", "エスカレーター": "Escalator",
  "アパート": "Apartment", "マンション": "Condominium", "オフィス": "Office", "パーティー": "Party", "イベント": "Event",
  "コンサート": "Concert", "チケット": "Ticket", "スポーツ": "Sports", "サッカー": "Soccer", "バスケットボール": "Basketball",
  "テニス": "Tennis", "ゴルフ": "Golf", "スキー": "Ski", "スノーボード": "Snowboard", "ランニング": "Running",
  "ジム": "Gym", "ヨガ": "Yoga", "スイミング": "Swimming", "バイク": "Motorbike", "ドライブ": "Drive",
  "タクシー": "Taxi", "バス": "Bus", "トラック": "Truck", "トレイン": "Train", "エアコン": "Air conditioner",
  "クーラー": "Cooler", "ヒーター": "Heater", "ベッド": "Bed", "ソファ": "Sofa", "テーブル": "Table",
  "チーム": "Team", "コーチ": "Coach", "マネージャー": "Manager", "アイドル": "Idol", "アニメ": "Anime",
  "マンガ": "Manga", "ドラマ": "Drama", "シリーズ": "Series", "ヒーロー": "Hero", "モンスター": "Monster",
  "デザイン": "Design", "ファッション": "Fashion", "ブランド": "Brand", "プロジェクト": "Project", "ビジネス": "Business",
  "マーケティング": "Marketing", "プレゼント": "Gift", "サプライズ": "Surprise", "トラブル": "Trouble", "ラッキー": "Lucky"
};

// ==== Variables del juego ====
let availableWords = [...allWords];
let timer;
let round = 1;
let turn = 0;
let lastStartingTeamIndex = 0;
let explainingTeamIndex = 0;
let guessOrder = [];
let guessIndex = 0;
let currentWord = "";
const teams = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startCountdown(callback) {
  const countdownEl = document.getElementById("countdown");
  countdownEl.style.display = "block";
  let count = 3;
  countdownEl.innerText = count;
  const interval = setInterval(() => {
    count--;
    countdownEl.innerText = count;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      callback();
    }
  }, 1000);
}

function startTimer(seconds, onEnd) {
  clearInterval(timer);
  let timeLeft = seconds;
  document.getElementById('timer').innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('alarm-sound').play();
      onEnd();
    }
  }, 1000);
}

function startRound() {
  if (availableWords.length === 0) {
    availableWords = shuffle([...allWords]);
    alert("All words used. Reshuffling!");
    round++;
    turn = 1;
  } else {
    turn++;
    document.getElementById('turn').innerText = turn;
  }

  document.getElementById("hint").innerText = "";
  explainingTeamIndex = lastStartingTeamIndex;
  lastStartingTeamIndex = (explainingTeamIndex + 1) % teams.length;
  document.getElementById("explaining").innerText = `Explaining: ${teams[explainingTeamIndex].name}`;
  currentWord = availableWords.pop();
  document.getElementById('word').innerText = "***";

  guessOrder = [];
  for (let i = 0; i < teams.length; i++) {
    guessOrder.push((explainingTeamIndex + i) % teams.length);
  }

  guessIndex = 0;
  highlightCurrentTeam(-1);
  startCountdown(() => {
    document.getElementById('word').innerText = currentWord;
    startTimer(25, () => {
      guessIndex = 0;
      nextGuessPhase();
    });
  });
}

function skipWord() {
  clearInterval(timer);
  startRound();
}

function nextGuessPhase() {
  if (guessIndex >= guessOrder.length) {
    document.getElementById('word').innerText = "No team guessed it!";
    highlightCurrentTeam(-1);
    return;
  }
  const teamIndex = guessOrder[guessIndex];
  document.getElementById('word').innerText = `→ ${teams[teamIndex].name}'s turn`;
  highlightCurrentTeam(teamIndex);
  startTimer(8, () => {
    guessIndex++;
    nextGuessPhase();
  });
}

function correctAnswer() {
  const teamIndex = guessOrder[guessIndex];
  if (teamIndex !== undefined && teamIndex < teams.length) {
    teams[teamIndex].score++;
    renderTeams();
    clearInterval(timer);
    document.getElementById('correct-sound').play();
    document.getElementById("hint").innerText = "";
    document.getElementById('word').innerText = `${teams[teamIndex].name} guessed right!`;
    highlightCurrentTeam(-1);
  }
}

function showHint() {
  const hint = definitions[currentWord];
  document.getElementById("hint").innerText = hint ? `Hint: ${hint}` : "Hint not available.";
}

function hideWord() {
  clearInterval(timer);
  document.getElementById('word').innerText = "***";
  document.getElementById('timer').innerText = 25;
}

function addTeam() {
  const name = document.getElementById('newTeamName').value.trim();
  if (!name) return;
  const color = getRandomColor();
  teams.push({ name, score: 0, color });
  document.getElementById('newTeamName').value = "";
  renderTeams();
}

function getRandomColor() {
  const colors = ["#f44336", "#3f51b5", "#009688", "#ff9800", "#9c27b0", "#00bcd4", "#8bc34a"];
  return colors[teams.length % colors.length];
}

function renderTeams() {
  const teamsDiv = document.getElementById('teams');
  teamsDiv.innerHTML = "";
  teams.forEach((team, index) => {
    const div = document.createElement('div');
    div.className = 'team';
    div.style.backgroundColor = team.color;
    div.innerHTML = `
      <div class="team-name">${team.name}</div>
      <div class="score" id="score-${index}">Points: ${team.score}</div>
    `;
    teamsDiv.appendChild(div);
  });
  highlightCurrentTeam(guessOrder[guessIndex]);
}

function addPoint() {
  const name = prompt("Enter team name to add point:");
  const team = teams.find(t => t.name === name);
  if (team) {
    team.score++;
    renderTeams();
  } else {
    alert("Team not found.");
  }
}

function highlightCurrentTeam(index) {
  document.querySelectorAll('.team').forEach((el, i) => {
    el.style.outline = i === index ? '4px solid #333' : 'none';
  });
}
