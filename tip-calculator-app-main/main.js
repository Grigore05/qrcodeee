// Cache DOM elements
const form = document.getElementById("calculator");
const resetBtn = document.getElementById("reset");
const tipBtns = document
  .getElementById("tip-percentage")
  .querySelectorAll("button");

const tipTotal = document.getElementById("tip-amount");
const total = document.getElementById("total-amount");
const error = document.getElementById("error");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");

// Constants
const DEFAULT_VALUES = {
  tip: 0,
  bill: 0,
  people: 0,
  tipPerPerson: 0,
  billPerPerson: 0,
  activeTipButton: null,
};

let state = {
  ...DEFAULT_VALUES,
};

const resetBtnFocus = (btn) => {
  if (btn) {
    btn.classList.remove("selected");
    btn = null;
  }

  return;
};

// Add $ to totals and round up
const renderAmounts = (tipAmount, totalAmount) => {
  tipTotal.innerText = "$" + tipAmount.toFixed(2);
  total.innerText = "$" + totalAmount.toFixed(2);

  state.tipPerPerson = tipAmount;
  state.billPerPerson = totalAmount;
};

// Calculate the bill
const calculateBill = (billAmount, tipAmount, totalPeople) => {
  if (billAmount >= 0 && tipAmount >= 0 && totalPeople) {
    tipPerPerson = (billAmount * tipAmount) / totalPeople;
    billPerPerson = (billAmount + tipPerPerson) / totalPeople;

    renderAmounts(tipPerPerson, billPerPerson);
  }
  return;
};

const handleTipBtn = (e) => {
  state.tip = e.target.value;

  // Reset buttons and input if needed
  resetBtnFocus(state.activeTipButton);
  tipInput.value = "";

  // Add focus to selected button
  state.activeTipButton = Array.from(tipBtns).filter(
    (btn) => btn.value === state.tip
  )[0];

  state.activeTipButton.classList.add("selected");

  calculateBill(
    state.bill,
    state.tip,
    state.people,
    state.tipPerPerson,
    state.billPerPerson
  );
};

tipBtns.forEach((button) => {
  button.addEventListener("click", handleTipBtn);
});

// Handle custom tip input
const handleTipInput = (e) => {
  state.tip = e.target.value;

  // Reset tip button if input exist
  resetBtnFocus(state.activeTipButton);
};

tipInput.addEventListener("input", handleTipInput);

const assignInputs = {
  bill: (value) => (state.bill = Number(value)),
  tip: (value) => (state.tip = Number(value) / 100),
  people: (value) => {
    if (value !== "" && Number(value) === 0) {
      error.style.display = "block";
      return console.error("Can't be zero");
    }
    error.style.display = "none";
    state.people = Number(value);
  },
};

const handleSubmit = (e) => {
  e.preventDefault();

  let value = e.target.value;

  assignInputs[e.target.name](value);

  calculateBill(
    state.bill,
    state.tip,
    state.people,
    state.tipPerPerson,
    state.billPerPerson
  );
};

form.addEventListener("input", handleSubmit);

const handleReset = (e) => {
  // Reset form values and totals
  e.preventDefault();
  resetBtnFocus(state.activeTipButton);

  state = { ...DEFAULT_VALUES };
  renderAmounts(state.tipPerPerson, state.billPerPerson);

  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";
};

resetBtn.addEventListener("click", handleReset);