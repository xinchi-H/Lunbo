let n
初始化()
let timer = setInterval(() => {
    makeLeave(getImage(n))
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n + 1))
    n += 1
}, 3000)

document.addEventListener('visibilitychange', function (e) {
    if (document.hidden) {
        console.log('hidden')
        window.clearInterval(timer)
    } else {
        console.log('active')
        timer = setInterval(() => {
            makeLeave(getImage(n))
                .one('transitionend', (e) => {
                    makeEnter($(e.currentTarget))
                })
            makeCurrent(getImage(n + 1))
            n += 1
        }, 3000)
    }
})


/*初始化
$('.images > img:nth-child(1)').addClass('current')
$('.images > img:nth-child(2)').addClass('enter')
$('.images > img:nth-child(3)').addClass('enter')
$('.images > img:nth-child(4)').addClass('enter')*/
function 初始化() {
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}

function getImage(n) {
    return $(`.images > img:nth-child(${x(n)})`)
}

function makeLeave($node) {
    return $node.removeClass('current').addClass('leave')
}

function makeEnter($node) {
    return $node.removeClass('leave').addClass('enter')
}

function makeCurrent($node) {
    return $node.removeClass('enter').addClass('current')
}

//n求余数
function x(n) {
    if (n > 4) {
        n = n % 4
        if (n === 0) {
            n = 4
        }
    }
    return n
}