function toggleLanguageMenu() {
    var dropdown = document.getElementById("languageDropdown");
    if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
    } else {
        dropdown.classList.add('open');
    }
}


const imageButtons = document.querySelectorAll('.image-button');
const overlay = document.getElementById('overlay');

imageButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        overlay.style.display = 'block'; // オーバーレイを表示
        setTimeout(() => {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 段階的に暗くする
        }, 10); // CSS transition が適用されるためのわずかな遅延
    });
    button.addEventListener('mouseout', () => {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // 透明に戻す
        setTimeout(() => {
            overlay.style.display = 'none'; // 完全に透明になった後に非表示にする
        }, 10); // 透明に戻るのに合わせた遅延
    });
});
