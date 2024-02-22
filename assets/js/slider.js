
/* 
----------------------------------------
 ______ _      _____ _____  ______ _____  
/ ____/| |    |_   _|  __ \|  ____|  __ \ 
| (___ | |      | | | |  | | |__  | |__) |
\___  \| |      | | | |  | |  __| |  _  / 
 ___)  | |____ _| |_| |__| | |____| | \ \ 
|_____/|______|_____|_____/|______|_|  \_\

----------------------------------------
*/
function initSlider(){
    
    
    function findClosestNumInArr(arr, target) {
        // SORTED ARRAY ONLY
        // POSITIVE VALUES IN ARRAY ONLY
        let left = 0
        let right = arr.length - 1
        let i=0
    
        // takes mid value from array, compares it to target, narrows the array to the mid value
        while (left <= right || i < right) {
            let mid = Math.floor((left+right)/2)
            let midValue = arr[mid]
    
            if (midValue==target) {
                return midValue
            } else if (midValue > target) {
                right = mid - 1
            } else if (midValue < target) {
                left = mid + 1
            }
    
            i++
        }
        // here we have 2 values (left index, right index)
        // if one of them went out the array take second value
        if (left > arr.length-1) {
            return arr[right];
        } else if (right < 0) {
            return arr[left];
        }
    
        // find closest value to target between (left, right)
        let leftDistance = Math.abs(target-arr[left])
        let rightDistance = Math.abs(target-arr[right])
    
        let res = leftDistance > rightDistance ? arr[right] : arr[left]
        return res
    }
    
    
    
    function getFirstAndLastCard () {
        return {
            'first' : cardsWrapper.firstElementChild,
            'last' : cardsWrapper.lastElementChild
        }
    }
    
    
    
    // hides button when loading/resizing/swiping/clicking
    function hideButton (shift=0, load=false) {
        // load=true remove hide button transition
        let sliderWidth = sliderContainer.clientWidth
        let cardWidth = parseFloat(getComputedStyle(cardsWrapper.firstElementChild).width)
        let firstCardPos = getFirstAndLastCard().first.offsetLeft + shift
        let lastCardPos = getFirstAndLastCard().last.offsetLeft + shift
    
        // first card is to the right of container's start
        if (firstCardPos >= 0 - (sliderWidth*0.05)) {
            if (load){
                prevBtn.classList.add('hidden')
            } else {
                prevBtn.classList.add('hidden-transition')
            }
            prevBtn.classList.remove('visible-transition')
            prevBtn.removeEventListener('click', handleMoveCardsPrev)
        } else {
            prevBtn.classList.remove('hidden-transition', 'hidden')
            prevBtn.classList.add('visible-transition')
            prevBtn.addEventListener('click', handleMoveCardsPrev)
        }
    
        // last card is to the left of container's end
        if (lastCardPos <= Math.abs(sliderWidth-cardWidth) + (sliderWidth*0.05)) {
            if (load){
                nextBtn.classList.add('hidden')
            } else {
                nextBtn.classList.add('hidden-transition')
                nextBtn.removeEventListener('click', handleMoveCardsNext)
            }
            nextBtn.classList.remove('visible-transition')
        } else {
            nextBtn.classList.remove('hidden-transition', 'hidden')
            nextBtn.classList.add('visible-transition')
            nextBtn.addEventListener('click', handleMoveCardsNext)
        }
    }
    
    
    
    // move cards on click
    function moveCards(next=undefined) {
        if (next !== undefined) {
    
            let cardWidth = parseFloat(getComputedStyle(cardsWrapper.firstElementChild).width)
            let initial = parseFloat(cardsWrapper.style.transform.substring(11))||0
            let new_value
            if (next == true) { // if click on nextBtn
                new_value = Number(initial - cardWidth)
            } else { // if click on prevBtn
                new_value = Number(initial + cardWidth)
            }
            cardsWrapper.style.transform = 'translateX(' + new_value + 'px)'
    
            hideButton(new_value)
        }
    }
    
    
    
    function swipeAction (e) {
        if (!isDragging) return;
        // add prevent pointer class disable dragging event occured cause <a> tag
        sliderContainer.classList.add('prevent-pointer')
        // disable of transition optimize swiping and remove jerks
        cardsWrapper.classList.remove('cards-wrapper-transition')
        
        let mouseMoveDistance = startPosition - e.clientX
        startPosition = e.clientX;
        
        let style = cardsWrapper.style.transform
        let initial = +style.match(/[-0-9.]+(?=px)/);
        let new_value = initial-mouseMoveDistance
    
        cardsWrapper.style.transform = `translate(${new_value}px)`
    
        hideButton(new_value)
    
        isMouseMove = true
    }
    
    
    
    function getVisibleCards () {
        let sliderWidth = sliderContainer.clientWidth
        let cardF = getFirstAndLastCard().first
        let cardL = getFirstAndLastCard().last
        let cardWidth = cardF.clientWidth
        let cardPaddingLeft = getComputedStyle(cardF).paddingLeft
        let cardPaddingRight = getComputedStyle(cardL).paddingRight
        let padding = parseInt(cardPaddingLeft) + parseInt(cardPaddingRight)
    
        visibleCards = Math.round((sliderWidth + padding) / cardWidth)
        return visibleCards
    }
    
    
    
    // calculate array of positionsX needed to stick cards when swiping cards
    function calcTransformBreakpoints () {
        globalThis.transformBreakpoints = Array()
    
        let cardF = getFirstAndLastCard().first
        let cardL = getFirstAndLastCard().last
        let cardPaddingLeft = getComputedStyle(cardF).paddingLeft
        let cardPaddingRight = getComputedStyle(cardL).paddingRight
        let padding = parseInt(cardPaddingLeft) + parseInt(cardPaddingRight)
        // padding = left padding of container + right pad of container. Doesn't include cards's padding
        
        let cardWidth = parseFloat(getComputedStyle(cardsWrapper.firstElementChild).width)
        
        let end = cardWidth * cardsAmount - padding
    
        for (let i=0; i<end;) {
            transformBreakpoints.push(i)
            i = i + cardWidth
        }
    
        visibleCards = getVisibleCards()
        transformBreakpoints = transformBreakpoints.slice(0, transformBreakpoints.length - visibleCards + 1)
    }
    
    
    
    // automate stick cards to necessary position when swiping cards
    function stickShift() {
        // disable on click
        if (isMouseMove) {
            // negative value of closest need 'cause method
            // findClosestNumInArr works only with positive numbers
            // negative translate Coords to fix closest minus
            let translateCoords = -parseFloat(cardsWrapper.style.transform.substring(10))||0
            let closest = -findClosestNumInArr(transformBreakpoints, translateCoords)
            cardsWrapper.style.transform = 'translateX(' + closest + 'px)'
            hideButton(closest)
        }
        isMouseMove = false
    }
    
    
    /* HANDLERS */
    function handleMoveCardsNext() {
        let next
        moveCards(next=true)
    }
    function handleMoveCardsPrev() {
        let next
        moveCards(next=false)
    }
    function handleMouseDown(e) {
        isDragging = true;
        startPosition = e.clientX;
    }
    function handleMouseMove(e) {
        swipeAction(e)
    }
    function handleTouchMove(e) {
        swipeAction(e.touches[0])
    }
    function handleMouseUp() {
        isDragging = false;
        sliderContainer.classList.remove('prevent-pointer')
        cardsWrapper.classList.add('cards-wrapper-transition')
        stickShift()
    }
    
    
    
    function addSliderListeners() {
        nextBtn.addEventListener('click', handleMoveCardsNext)
        prevBtn.addEventListener('click', handleMoveCardsPrev)
    
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('touchstart', handleMouseDown);
    
        document.addEventListener('mousemove', handleMouseMove)
        slider.addEventListener('touchmove', handleTouchMove)
    
        document.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('touchend', handleMouseUp);
    
        cardsWrapper.classList.add('cards-wrapper-transition')
    }
    
    function initialize () {
        window.addEventListener('resize', () => {
            cardsWrapper.style.transform = 'translateX(' + 0 + 'px)'
            calcTransformBreakpoints()
    
            isSliderHidden = hideSlider()
            // resizing can change visible cards that affect to properly hide slider
            // if slider is need to be hidden remove all listeners
            // else return them back
            if (isSliderHidden) {
                nextBtn.removeEventListener('click', handleMoveCardsNext)
                prevBtn.removeEventListener('click', handleMoveCardsPrev)
                slider.removeEventListener('mousedown', handleMouseDown);
                slider.removeEventListener('touchstart', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove)
                slider.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('mouseup', handleMouseUp);
                slider.removeEventListener('touchend', handleMouseUp);
            } else {
                addSliderListeners()
            }
    
            hideButton(0, load=true)
        })
    
        // add listeners only if slider has not been hidden
        if (isSliderHidden==false){
            addSliderListeners()
            calcTransformBreakpoints()
        }
    }
    
    function hideSlider(cardsAmount) {
        if (getVisibleCards() >= cardsAmount) {
            hideButton(0, load=true)
            slider.style.cursor = 'default'
            return true
        }
        return false
    }
    
    


    const slider = document.querySelector('.slider')
    const sliderContainer = document.querySelector('.slider-container')
    const cardsWrapper = document.querySelector('.cards-wrapper')
    const prevBtn = document.querySelector('.slider-arrow-left')
    const nextBtn = document.querySelector('.slider-arrow-right')
    
    let isDragging = false
    let isMouseMove = false
    let startPosition = 0
    let visibleCards = 6        
    
    if (slider && sliderContainer && cardsWrapper) {
        globalThis.cardsAmount = cardsWrapper.childElementCount
        globalThis.load=true
        globalThis.isSliderHidden = hideSlider(cardsAmount) // hide btns if few cards
        
        initialize()
        hideButton(0, load=load)
    }
    // window.addEventListener('load', () => {
    
    // })
    }
export default initSlider