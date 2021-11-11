let darkmode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#dark-mode-toggle");





const enableDarkMode = () =>{
    document.body.classList.add("darkmode");

    localStorage.setItem("darkMode", "enabled")
};

const disableDarkMode = () =>{
    document.body.classList.remove("darkmode");

    localStorage.setItem("darkMode", null)
};
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