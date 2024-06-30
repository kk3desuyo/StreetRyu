document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を阻止
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // ユーザー名とパスワード
    var correctUsername = 'pr03';
    var correctPassword = 'Y2381149';

    if (username === correctUsername && password === correctPassword) {
        // 認証成功
        window.location.href = 'admin_contents_PR2024-03.html'; // 管理者コンテンツページへリダイレクト
    } else {
        // 認証失敗
        alert('ユーザー名またはパスワードが間違っています。');
    }
});


/*上がログインまで。下からログイン後*/


document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    var newTask = document.getElementById('newTask').value;
    if (newTask) {
        var now = new Date();
        var timestamp = formatDate(now);
        var task = { content: newTask, created: timestamp };

        saveTask(task);
        displayTask(task);

        document.getElementById('newTask').value = ''; // 入力欄をクリア
    } else {
        alert('タスクを入力してください。');
    }
}

function displayTask(task) {
    var li = document.createElement('li');
    li.innerHTML = `${task.content} <span class='timestamp'>(${task.created})</span>`;
    li.dataset.created = task.created; // タスクの一意の識別子を設定
    li.onclick = function() {
        if (confirm('このタスクを削除しますか？')) {
            removeTask(this);
        }
    };
    document.getElementById('taskList').appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

function removeTask(li) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let created = li.dataset.created;
    let filteredTasks = tasks.filter(task => task.created !== created);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    li.parentNode.removeChild(li); // DOMからも削除
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

