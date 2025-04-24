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

// ==== Funciones ====
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
if (isMobileDevice()) {
  document.body.classList.add("mobile");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
    alert("すべての言葉を使いました！新しくシャッフルしました。");
    round++;
    turn = 1;
  } else {
    updateCounters();
  }
  document.getElementById("hint").innerText = "";
  explainingTeamIndex = lastStartingTeamIndex;
  lastStartingTeamIndex = (explainingTeamIndex + 1) % teams.length;
  document.getElementById("explaining").innerText = `説明チーム: ${teams[explainingTeamIndex].name}`;
  currentWord = availableWords.pop();
  document.getElementById('word').innerText = currentWord;

  guessOrder = [];
  for (let i = 0; i < teams.length; i++) {
    guessOrder.push((explainingTeamIndex + i) % teams.length);
  }
  guessIndex = 0;
  highlightCurrentTeam(-1);
  startTimer(30, () => {
    guessIndex = 0;
    nextGuessPhase();
  });
}

function nextGuessPhase() {
  if (guessIndex >= guessOrder.length) {
    document.getElementById('word').innerText = "どのチームも正解できませんでした";
    highlightCurrentTeam(-1);
    return;
  }
  const teamIndex = guessOrder[guessIndex];
  const team = teams[teamIndex];
  document.getElementById('word').innerText = `→ ${team.name} チームの番`;
  highlightCurrentTeam(teamIndex);
  startTimer(8, () => {
    guessIndex++;
    nextGuessPhase();
  });
}

function correctAnswer() {
  const teamIndex = guessOrder[guessIndex];
  if (teamIndex !== undefined && teamIndex < teams.length) {
    const team = teams[teamIndex];
    team.score++;
    renderTeams();
    clearInterval(timer);
    document.getElementById('correct-sound').play();
    document.getElementById("hint").innerText = "";
    document.getElementById('word').innerText = `${team.name} チームが正解しました！`;
    highlightCurrentTeam(-1);
  } else {
    alert("現在の回答中のチームが見つかりません。");
  }
}

function showHint() {
  const hint = definitions[currentWord];
  document.getElementById("hint").innerText = hint ? `Hint: ${hint}` : "Hint: Not available";
}

function hideWord() {
  clearInterval(timer);
  document.getElementById('word').innerText = "***";
  document.getElementById('timer').innerText = 15;
}

function addTeam() {
  const name = document.getElementById('newTeamName').value.trim();
  if (!name) return;
  teams.push({ name, score: 0 });
  document.getElementById('newTeamName').value = "";
  renderTeams();
}

function renderTeams() {
  const teamsDiv = document.getElementById('teams');
  teamsDiv.innerHTML = "";
  teams.forEach((team, index) => {
    const div = document.createElement('div');
    div.className = 'team';
    div.innerHTML = `
      <div class="team-name">${team.name}</div>
      <div class="score" id="score-${index}">ポイント: ${team.score}</div>
    `;
    teamsDiv.appendChild(div);
  });
  highlightCurrentTeam(guessOrder[guessIndex]);
}

function addPoint() {
  if (teams.length === 0) return alert("チームを追加してください！");
  const teamName = prompt("ポイントを追加するチーム名を入力してください：");
  const team = teams.find(t => t.name === teamName);
  if (team) {
    team.score++;
    renderTeams();
  } else {
    alert("チームが見つかりません。");
  }
}

function updateCounters() {
  turn++;
  document.getElementById('turn').innerText = turn;
  if (turn > allWords.length) {
    round++;
    turn = 1;
    document.getElementById('round').innerText = round;
    document.getElementById('turn').innerText = turn;
  }
}

function highlightCurrentTeam(index) {
  document.querySelectorAll('.team').forEach((el, i) => {
    el.style.backgroundColor = i === index ? '#d1f7c4' : 'white';
  });
}
