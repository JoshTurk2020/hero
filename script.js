// script.js

document.addEventListener('DOMContentLoaded', () => {
    const storyElement = document.getElementById('story');
    const choicesElement = document.getElementById('choices');
    const heartsElement = document.getElementById('hearts');
    const backgroundMusic = document.getElementById('background-music');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    let hearts = 3;
    let currentScene = 0;
    let heroIdentity = '';

    const scenes = [
        {
            text: "You wake up in a dark dungeon with no memory of who you are...",
            choices: [
                { text: "Explore the dungeon", nextScene: 1 },
                { text: "Stay still and try to remember", nextScene: 2 }
            ]
        },
        {
            text: "As you explore, you encounter a goblin. It asks you a question.",
            enemy: true,
            questions: [
                { question: "What is the correct past tense of 'go'?", answer: "went" },
                { question: "Which is correct: 'their', 'there', or 'they're'?", answer: "their" },
                { question: "Choose the correct form: 'its' or 'it's'?", answer: "it's" }
            ],
            nextScene: 3
        },
        {
            text: "You sit still, but nothing happens. You decide to explore the dungeon.",
            choices: [
                { text: "Continue", nextScene: 1 }
            ]
        },
        {
            text: "You defeated the goblin! You remember your name: Hero.",
            choices: [
                { text: "Take the left path", nextScene: 4 },
                { text: "Take the right path", nextScene: 5 }
            ]
        },
        {
            text: "You encounter a locked door.",
            door: true,
            questions: [
                { question: "What is the correct form: 'affect' or 'effect'?", answer: "effect" }
            ],
            nextScene: 6
        },
        {
            text: "You encounter a fierce dragon. It asks you a question.",
            enemy: true,
            questions: [
                { question: "Choose the correct form: 'your' or 'you're'?", answer: "you're" },
                { question: "What is the plural of 'child'?", answer: "children" },
                { question: "Which is correct: 'to', 'too', or 'two'?", answer: "too" }
            ],
            nextScene: 7
        },
        {
            text: "You unlocked the door and continue your journey.",
            choices: [
                { text: "Continue", nextScene: 5 }
            ]
        },
        {
            text: "You defeated the dragon and remember your quest: to escape the dungeon.",
            choices: [
                { text: "Continue", nextScene: 8 }
            ]
        },
        {
            text: "You reach the final room and face the evil boss blocking the exit.",
            enemy: true,
            questions: [
                { question: "What is the correct form: 'accept' or 'except'?", answer: "accept" },
                { question: "Which is correct: 'than' or 'then'?", answer: "than" },
                { question: "Choose the correct form: 'affect' or 'effect'?", answer: "affect" }
            ],
            nextScene: 9
        },
        {
            text: "You defeated the boss and remember everything. You are free!",
            choices: [
                { text: "Play Again", nextScene: 0 }
            ]
        }
    ];

    function startGame() {
        backgroundMusic.play();
        hearts = 3;
        currentScene = 0;
        heroIdentity = '';
        updateHearts();
        showScene();
    }

    function updateHearts() {
        heartsElement.innerHTML = '❤️'.repeat(hearts);
    }

    function showScene() {
        const scene = scenes[currentScene];
        storyElement.innerText = scene.text;

        choicesElement.innerHTML = '';

        if (scene.enemy) {
            askQuestion(scene.questions);
        } else if (scene.door) {
            askQuestion(scene.questions, true);
        } else {
            scene.choices.forEach(choice => {
                const button = document.createElement('button');
                button.innerText = choice.text;
                button.onclick = () => {
                    currentScene = choice.nextScene;
                    showScene();
                };
                choicesElement.appendChild(button);
            });
        }
    }

    function askQuestion(questions, isDoor = false) {
        const question = questions[Math.floor(Math.random() * questions.length)];
        const userAnswer = prompt(question.question);

        if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
            correctSound.play();
            if (isDoor) {
                currentScene = scenes[currentScene].nextScene;
            } else {
                heroIdentity += ' ' + question.answer; // Mock identity reveal
                currentScene = scenes[currentScene].nextScene;
            }
        } else {
            wrongSound.play();
            hearts--;
            if (hearts <= 0) {
                alert('Game Over');
                startGame();
                return;
            }
        }

        updateHearts();
        showScene();
    }

    startGame();
});
