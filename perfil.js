const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const infoItems = document.querySelectorAll(".info-item");

editBtn.addEventListener("click", () => {
  infoItems.forEach((item) => {
    const text = item.textContent.split(": ")[1];
    const label = item.querySelector("strong").textContent.replace(":", "");
    item.innerHTML = <strong>${label}:</strong> <input type="text" value="${text}">;
  });
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  infoItems.forEach((item) => {
    const input = item.querySelector("input");
    const label = item.querySelector("strong").textContent.replace(":", "");
    item.innerHTML = <strong>${label}:</strong> ${input.value};
  });
  saveBtn.classList.add("hidden");
  editBtn.classList.remove("hidden");
});
