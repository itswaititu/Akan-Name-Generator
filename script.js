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

// Function to calculate day of week using Zeller's congruence
function getDayOfWeek(day, month, year) {
  // Adjust month: March = 3, April = 4, ..., January = 13, February = 14
  if (month === 1 || month === 2) {
    month += 12;
    year--;
  }

  const CC = Math.floor(year / 100); // Century
  const YY = year % 100; // Year within century

  // Zeller's congruence formula: d = ((CC/4 - 2*CC - 1) + (5*YY/4) + (26*(MM+1)/10) + DD) % 7
  let dayIndex =
    Math.floor(
      CC / 4 - 2 * CC - 1 + (5 * YY) / 4 + (26 * (month + 1)) / 10 + day,
    ) % 7;

  // Convert to positive number (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
  // But our days array starts with Sunday (index 0), so we need to adjust
  dayIndex = Math.floor(dayIndex);
  dayIndex = (dayIndex + 7) % 7; // Ensure positive remainder

  // Zeller's formula gives: 0=Saturday, 1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thursday, 6=Friday
  // Convert to our days array format (0=Sunday, 1=Monday, ..., 6=Saturday)
  return (dayIndex + 1) % 7;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const birthdateValue = document.getElementById("birthdate").value;
  const genderValue = document.getElementById("gender").value;

  if (!birthdateValue) {
    alert("Please enter your birth date (required).");
    return;
  }

  if (!genderValue) {
    alert("Please select your gender.");
    return;
  }

  // Parse the date components
  const dateParts = birthdateValue.split("-");
  if (dateParts.length !== 3) {
    alert("Please enter a valid birth date.");
    return;
  }

  let year = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]);
  let day = parseInt(dateParts[2]);

  // Validate date
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    alert("Please enter a valid birth date.");
    return;
  }

  // Check if date exists ( validation)
  const testDate = new Date(year, month - 1, day);
  if (
    testDate.getDate() !== day ||
    testDate.getMonth() !== month - 1 ||
    testDate.getFullYear() !== year
  ) {
    alert("Please enter a valid birth date.");
    return;
  }

  // Calculate the day 
  const dayIndex = getDayOfWeek(day, month, year);
  const dayName = days[dayIndex];
  const akanName =
    genderValue === "male" ? maleNames[dayIndex] : femaleNames[dayIndex];

  resultElement.textContent = `You were born on a ${dayName}. Your Akan name is ${akanName}.`;
});
