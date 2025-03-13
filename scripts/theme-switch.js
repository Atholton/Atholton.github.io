function addSwitch() {
  let container = document.createElement('div')
  container.innerHTML = `
  <div class="theme-icon" onclick="bttnChangeTheme()">
    <div class="theme-icon-back">
      <div class="theme-circle" id="theme-circle"></div>
    </div>
  </div>`
  document.body.prepend(container)
}

addSwitch()

const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const circle = document.getElementById("theme-circle")

let isDark = systemIsDark;

function bttnChangeTheme(){
  isDark = !isDark;
  const theme = isDark ? "dark" : "light";

  if(isDark){
    // circle.style.float = "left"; //snappy
    circle.style.transform = circleXPosDark;
  } else {
    // circle.style.float = "right"; //snappy
    circle.style.transform = circleXPosLight;
  }
  
  changeTheme(theme);
}

function changeTheme(theme){
  if(theme === "device")
    theme = systemIsDark ? "dark" : "light";
  document.body.className = theme;
}

// Set up theme button based on starting theme
if(isDark){
  var circleXPosDark = "translateX(0)";
  var circleXPosLight = "translateX(50px)";
} else {
  var circleXPosDark = "translateX(50px)";
  var circleXPosLight = "translateX(0)";
}