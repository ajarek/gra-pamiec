const classColor = ['red', 'red', 'blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'orange', 'orange', 'magnata', 'magnata', 'lightblue', 'lightblue', 'cyan', 'cyan', 'tomato', 'tomato']
let cards = document.querySelectorAll('.card')
cards = [...cards]
let twoColor = []
let win = 0
let withPair = classColor.length / 2
let start

const hiddenColor = () => {
    cards.forEach(card => {
        card.classList.add('hidden')
    })
}

function listner() {
    card = this
    card.classList.remove('hidden')
    twoColor.push(card)

    if (twoColor.length == 1) {
        card.removeEventListener('click', listner)
    }

    if (twoColor.length == 2) {
        cards.forEach(card => {
            card.removeEventListener('click', listner)
        })
    }

    if (twoColor.length == 2 && twoColor[0].className == twoColor[1].className) {
        win = win + 1

        if (win == withPair) {
            let stop = new Date().getTime()
            alert(`Brawo wygrana wynik: ${(stop-start)/1000} s`)
            location.reload()
        }
        twoColor.forEach(card => card.classList.add("off"))
        cards = cards.filter(card => !card.classList.contains("off"))
        cards.forEach(card => {
            card.addEventListener('click', listner)
        })
        twoColor = []
    }

    if (twoColor.length == 2 && twoColor[0].className != twoColor[1].className) {
        twoColor.forEach(() => setTimeout(hiddenColor, 700))
        cards.forEach(card => {
            card.addEventListener('click', listner)
            twoColor = []
        })
    }
}

const setColor = () => {
    cards.forEach(card => {
        position = Math.floor(Math.random() * classColor.length)
        card.classList.add(classColor[position])
        classColor.splice(position, 1)
        setTimeout(hiddenColor, 3000)
        card.addEventListener('click', listner)
    })
    start = new Date().getTime()
}

setColor()