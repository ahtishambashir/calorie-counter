const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);

const reverseString = (str) => {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};

console.log(reverseString("MentorSols"));

// done with forward loop

const forwardReverseString = (str) => {
  let reversedFor = "";
  for (let i = 0; i < str.length; i++) {
    reversedFor = str[i] + reversedFor;
  }
  return reversedFor;
};
console.log(forwardReverseString("frontend"));

const isPalindrome = (str) => {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
};

console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));

const removeDuplicates = (arr) => {
  let result = [];
  let seen = {};
  for (let i = 0; i < arr.length; i++) {
    if (!seen[arr[i]]) {
      result.push(arr[i]);
      seen[arr[i]] = true;
    }
  }
  return result;
};

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));

const flattenArray = (arr) => {
  let result = [];
  if (Array.isArray(arr[i])) {
    let flattened = flattenArray(arr[i]);
    for (let j = 0; j < flattened.length; j++) {
      result.push(flattened[j]);
    }
  } else {
    result.push(arr[i]);
  }
  return result;
};

console.log(flattenArray([1, [2, [3, [4]]]]));

const countVowels = (str) => {
  let count = 0;
  let vowels = "aeiouAEIOU";

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (str[i] === vowels[j]) {
        count++;
        break;
      }
    }
  }
  return count;
};

console.log(countVowels("developer"));

const firstNonRepeating = (atr) => {
  let frequency = {};

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (frequency[char]) {
      frequency[char]++;
    } else {
      frequency[char] = 1;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (frequency[str[i]] === 1) {
      return str[i];
    }
  }
  return null;
};

console.log(firstNonRepeating("aabbcdee"));

const groupBy = (arr, key)=> {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let groupKey = item[key];
    if(!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
  }
  return result;
}

const data = [
  { country: "US", name: "John" },
  { country: "CA", name: "Ali" },
  { country: "US", name: "Sarah" },
];

console.log(groupBy(data, "country"));

const debounce = (fn, delay)=> {
  let timeOutId;
  return function(...arg) {
    if(timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(()=> {
      fn(...arg);
    }, delay);
  }
}

const sayHello = (name)=> {
  console.log("Name:", `${name}!`)
}

const debouncedSayHello = debounce(sayHello, 2000);

debouncedSayHello("John");   // Timer starts
debouncedSayHello("Sarah");  // Timer resets
debouncedSayHello("Mike");