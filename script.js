// クイズデータ
const quiz = [
    {
        question: "RADWIMPSはデビュー日はいつ？",
        choices: [
            "2000年11月22日",
            "2000年11月23日",
            "2005年11月22日",
            "2005年11月23日"
        ],
        answer: 3
    },
    {
        question: "「愛し」この曲を何と読む？",
        choices: [
            "あいし",
            "いとし",
            "かなし",
            "うつくし"


        ],
        answer: 2
    },
    {
        question: "RADWIMPSのライブのアンコールの掛け声は何？",
        choices: [
            "ラッド！",
            "アンコール！",
            "「もしも」を歌う",
            "「いいんですか?」を歌う"
        ],
        answer: 2

    },
    {
        question: "歌いだしが「今からお前に何話そうかな」。この曲のタイトルは？",
        choices: [
            "ふたりごと",
            "有心論",
            "告白",
            "オーダーメイド"
        ],
        answer: 0
    }
    ,
    {
    
        question: "2011年度のNHKサッカー中継テーマソングに起用された曲は？",
        choices: [
            "ドリーマーズ・ハイ",
            "おしゃかしゃま",
            "DADA",
            "君と羊と青"
        ],
        answer: 3
    },
    {
        question: "メジャーデビューしたシングルのタイトルは？",
        choices: [
            "イーディーピー",
            "25個目の染色体",
            "もしも",
            "夢番地"
        ],
        answer: 1
    },
    {
        question: "「針と棘」では何を抜いてくださいと言っている？",
        choices: [
            "心の棘",
            "言葉の棘",
            "心臓の針",
            "言葉の針"
        ],
        answer: 3
    },
    {
        question: "野田洋次郎の誕生日は？",
        choices: [
            "7月5日",
            "7月11日",
            "10月5日",
            "10月11日"
        ],
        answer: 0
    },
    {
        question: "2014年初の海外ツアーで訪れたのは？",
        choices: [
            "台湾",
            "タイ",
            "アメリカ",
            "香港"
        ],
        answer: 3

    },
    {
        question: "「シザースタンド」で「右利きのはさみを○○ような僕らの愛しい日々」○○にはいる歌詞は？",
        choices: [
            "何度も左手の手首に近づけては遠ざける",
            "左手の手首に添えて離すことを繰り返す",
            "両手で必死に切り続ける",
            "左手で無理に切り続ける"
        ],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

// HTMLの要素を取得
const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const finishArea = document.getElementById("finishArea");
const quizArea = document.getElementById("quizArea");
const scoreText = document.getElementById("scoreText");
const highScore = document.getElementById("highScore");

// Cookieを設定
function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    document.cookie =
        name + "=" + value +
        ";expires=" + date.toUTCString() +
        ";path=/";
}

// Cookieを取得
function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }

    return "";
}

// 問題を表示
function showQuestion() {

    result.textContent = "";

    questionNumber.textContent =
        "問題 " + (currentQuestion + 1);

    question.textContent =
        quiz[currentQuestion].question;

    choices.innerHTML = "";

    quiz[currentQuestion].choices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.textContent = choice;
        button.className = "choice";

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        choices.appendChild(button);
        choices.appendChild(document.createElement("br"));
        choices.appendChild(document.createElement("br"));
    });
}

// 回答判定
function checkAnswer(index) {

    const buttons = document.querySelectorAll(".choice");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (index === quiz[currentQuestion].answer) {
        result.textContent = "〇 正解！";
        score++;
    } else {
        result.textContent = "× 不正解";
    }
}

// 次の問題
nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < quiz.length) {

        showQuestion();

    } else {

        quizArea.style.display = "none";
        finishArea.style.display = "block";

        scoreText.textContent =
            quiz.length + "問中 " + score + "問正解！";

        let best = getCookie("highscore");

        if (best === "" || score > Number(best)) {

            setCookie("highscore", score, 30);

            best = score;
        }

        highScore.textContent = best;
    }
});

// リスタート
document.getElementById("restartButton").addEventListener("click", function () {

    location.reload();

});

// Cookie削除
document.getElementById("resetCookie").addEventListener("click", function () {

    document.cookie =
        "highscore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("Cookieを削除しました！");
});

// 初回表示
const best = getCookie("highscore");

if (best !== "") {
    highScore.textContent = best;
}

showQuestion();