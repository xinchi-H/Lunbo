let $buttons = $('#buttons>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0
let operation = ""
//复制第一张和最后一张
let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq($images.length - 1).clone(true)
$slides.append($firstCopy)
$slides.prepend($lastCopy)
//初始位置
$slides.css({transform: 'translateX(-600px)'})

//监听buttons
$('#buttons').on('click', 'button', function (e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
})

//给controls加节流
function clickControls(fn) {
    let canUse = true
    return function () {
        if (canUse) {
            if (operation === "previous") {
                fn.call(this, current - 1)
            }else if(operation === "next"){
                fn.call(this, current + 1)
            }
            canUse = false
            setTimeout(() => canUse = true, 1500)
        }
    }
}

let clickControl = clickControls(goToSlide)

//监听controls
$(previous).on('click', function () {
    operation = "previous"
    clickControl()
})
$(next).on('click', function () {
    operation = "next"
    clickControl()
})

//图片切换
function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        // 最后一张到第一张
        $slides.css({transform: `translateX(${-($buttons.length + 1) * 600}px)`})
            .one('transitionend', function () {
                $slides.hide()
                $slides.offset()
                $slides.css({transform: `translateX(${-(index + 1) * 600}px)`}).show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        // 第一张到最后一张
        $slides.css({transform: `translateX(0px)`})
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({transform: `translateX(${-(index + 1) * 600}px)`}).show()
            })
    } else {
        $slides.css({transform: `translateX(${-(index + 1) * 600}px)`})
    }
    current = index
}

//设置定时器
let timer = setInterval(function () {
    goToSlide(current + 1)
}, 3000)
$('.allButton,.window').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide(current + 1)
    }, 3000)
})
//监听是否停在目前页面
document.addEventListener('visibilitychange', function (e) {
    if (document.hidden) {
        window.clearInterval(timer)
    } else {
        timer = setInterval(function () {
            goToSlide(current + 1)
        }, 3000)
    }
})