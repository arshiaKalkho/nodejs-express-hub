let darkmode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
let vars = document.querySelector("html");
let separator = document.querySelector(".separator");
let footer =  document.querySelector(".footer");





const enableDarkMode = () =>{
    document.body.classList.add("darkmode");
    vars.style.setProperty('--color-primary', "#000ffc" )
    vars.style.setProperty('--color-secondary', "001220" )
    vars.style.setProperty('--color-tertioary', "#00ddfc" )
    
    separator.style.backgroundImage = "url('./views/images/separator-light-mode.svg')"
    
    
    footer.style.backgroundImage = "url('./views/images/footer-light-mode.svg')"
    
    
    
    
    localStorage.setItem("darkMode", "enabled")
};

const disableDarkMode = () =>{
    vars.style.setProperty('--color-primary', "#c62368" )
    vars.style.setProperty('--color-secondary', "#001220" )
    vars.style.setProperty('--color-tertioary', "#fa7268" )

    separator.style.backgroundImage = "url('./views/images/separator.svg')"

    footer.style.backgroundImage = "url('./views/images/footer-background.svg')"

    localStorage.setItem("darkMode", null)
};


//on page load check for local storage var darkmode's value
if(darkmode === "enabled"){
    enableDarkMode()
}

//when clicking on the darkmode button
darkModeToggle.addEventListener("click", ()=>{
    darkmode = localStorage.getItem("darkMode");
    if(darkmode !== "enabled"){
        enableDarkMode()
    }else{
        disableDarkMode()
    }
})