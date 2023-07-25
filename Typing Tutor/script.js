let sentence = document.querySelector('.sentence');
let text = document.querySelector('.text');
console.log(sentence)
let i = 0;
text.addEventListener('keydown', (e) => {
    if ((e.key === sentence.innerText[i]) && (e.key !== 'Backspace')) {
        console.log(1)
    }
    console.log(sentence.innerText[i]);
    i++;
});




