const grid = document.getElementById("grid");

for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.addEventListener("click", () => {
    cell.style.backgroundColor = cell.style.backgroundColor === "skyblue" ? "white" : "skyblue";
  });
  grid.appendChild(cell);
}
