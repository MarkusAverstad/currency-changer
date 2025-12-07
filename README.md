# Frontend Assignment
Imagine you have the power to change the currency rates, you can make a country rich!
## Summary
Create an app for reading and updating currency values. The main view of the app should
be a list of currencies, with the option to update the value (rate) and symbol of each
currency directly in the list. The edits should be “live”, meaning no submit/save button is
needed.
## Architecture
You should consider your app to be a page/module of a larger application, with respect to
scalability, reusability, accessibility, theming, etc.
- Implement some form of state management (of your choice).
- Implement validation (value types, required fields) for the two inputs (rate and symbol).
- Feel free to use a component library for the different views/controls.
- Styling should be done at a medium level: ensure that the app is laid out properly
  (on multiple screen sizes) and that it looks and feels good, but no need to overdo
  the tiny details.
  You are free to use any framework/library of your choice, though Angular 19/20 (w/ signals)
  is preferred.
## API
  You can use the following API to fetch the currencies:
  https://api.coingecko.com/api/v3/exchange_rates
  Updating the currencies should be done via a mocked API call (no need to persist the
  updates).
##  Notes
  The guideline for this assignment is to take roughly 4 hours, but feel free to go outside
  those bounds – we can discuss the reasoning afterwards.