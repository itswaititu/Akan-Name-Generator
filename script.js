const form = document.getElementById("akanform");
const resultElement = document.getElementById("result");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const maleNames = [
  "Kwasi",
  "Kwadwo",
  "Kwabena",
  "Kwaku",
  "Yaw",
  "Kofi",
  "Kwame",
];

const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const birthdateValue = document.getElementById("birthdate").value;
  const genderValue = document.getElementById("gender").value;

  if (!birthdateValue) {
    alert("Please enter your birth date.");
    return;
  }

  if (!genderValue) {
    alert("Please select a gender.");
    return;
  }

  const birthdate = new Date(`${birthdateValue}T00:00:00`);
  if (Number.isNaN(birthdate.getTime())) {
    alert("Please enter a valid birth date.");
    return;
  }

  const dayIndex = birthdate.getUTCDay();
  const dayName = days[dayIndex];
  const akanName =
    genderValue === "male" ? maleNames[dayIndex] : femaleNames[dayIndex];

  resultElement.textContent = 
  `You were born on a ${dayName}.
   Your Akan name is ${akanName}.`;
});
