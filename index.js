const colorInputEl = document.getElementById("color-picker")
const selectEl = document.getElementById("scheme-mode")
const btnEl = document.getElementById("get-color-btn")
const midSectionEl = document.getElementById("mid-section")
const bottomSectionEl = document.getElementById("bottom-section")

btnEl.addEventListener('click', () => getColorScheme())

function getColorScheme() {
    const hex = colorInputEl.value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${selectEl.value}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colorsArr = data.colors
            let midSectionHTML = ''
            let bottomSectionHTML = ''
            colorsArr.forEach((obj) => {
                midSectionHTML += `
                <div style="background-color:${obj.hex.value}"></div>
                `
                bottomSectionHTML += `
                <p class="hex-value">${obj.hex.value}</p>  
                `
            })
            midSectionEl.innerHTML = midSectionHTML
            bottomSectionEl.innerHTML = bottomSectionHTML
        })
}

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('slide-up')
      observer.unobserve(entry.target)
    } 
  })
}

const options = {
  threshold: 0.2
}

const observer = new IntersectionObserver(callback, options)

const animatedElements = document.querySelectorAll('.content')
animatedElements.forEach(el => observer.observe(el))