export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

export function checkWin(correct, wrong, word, words) {
    let status = 'win';
    const currentIndex = words.findIndex(obj => obj.word === word);
    if(currentIndex == words.length - 1) {
        // check for win
        status="finishwin";
        
        word.split('').forEach(letter => {
            if (!correct.includes(letter)) {
                status = '';
            }
        })

        // check for lose
        if (wrong.length == 6) status = 'finishlose';
    } else{

        // check for win
        word.split('').forEach(letter => {
            if (!correct.includes(letter)) {
                status = '';
            }
        })

        // check for lose
        if(wrong.length == 6) status = 'lose';
    }

    return status;
}