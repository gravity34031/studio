/* COLLAPSE ADD-ON*/
/* close collapse when resizing window */
navbarCollapse = document.querySelector('.navbar-collapse')
navbarCollapseBtn = document.querySelector('.navbar-toggler')

navbarCollapseObject = new bootstrap.Collapse(navbarCollapse, {
    toggle:false
})


window.addEventListener('resize', () => {
    if (navbarCollapseBtn.ariaExpanded === 'true') {
        navbarCollapseObject.toggle()
    }
})