# SpendWise - Interactive Budgeting Dashboard

## Overview
SpendWise is an interactive web application designed to help users track monthly budgets, log expenses dynamically, and monitor financial health with real-time DOM updates and status warnings.

## Improvements Made This Week
- Transformed the static application into an interactive platform driven by user events.
- Replaced basic console output with live DOM element rendering.
- Implemented arrays and loops to store and iterate over multiple expense records dynamically.
- Added conditional decision-making logic to provide instant financial alerts based on remaining balances.

## How Conditionals Are Used
Conditional statements (`if...else if...else`) are used inside `evaluateBudgetStatus()` to analyze whether the user's remaining balance is negative (over budget), running low (<20% remaining), or healthy (surplus), changing alert box styling and messages accordingly.

## How Arrays Are Used to Store Data
An array of objects (`expenses`) is initialized to store multiple expense records, where each record contains property keys for `name` and `amount`. This allows scalable record management.

## How the DOM is Updated
The application uses DOM methods (`document.getElementById`, `document.createElement`, `innerHTML`, and text content manipulation) to update summary metrics and inject newly added expenses directly into the webpage without reloading.

## How User Interactions Are Handled Through Events
An `addEventListener` is attached to the expense form submission (`submit`), which intercepts default form reloads, retrieves user inputs, updates the array state, and re-renders the dashboard UI.

## Challenges Encountered and How They Were Resolved
- **Challenge:** Preventing page reloads from clearing dynamically added inputs.
- **Resolution:** Used `event.preventDefault()` inside the event listener function to securely capture form inputs and update the array state seamlessly.