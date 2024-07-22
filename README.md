# E-commerce Sales Dashboard

This Vue.js application provides an interactive sales dashboard for e-commerce sellers. It fetches sales data from an API and visualizes it using Highcharts charts. The dashboard also includes a data table for detailed SKU-level analysis.

## Features

- **Interactive Charts:** Visualize sales data (profit, FBA sales, FBM sales) over different time periods (7, 14, 30, 60 days).
- **Dynamic Filtering:** Select the desired date range to view specific sales data.
- **Detailed Data Table:** Drill down into SKU-level sales data for selected dates.
- **User Authentication:** Secure access to sales data with login/logout functionality.
- **State Management:** Utilizes Vuex for efficient data management and reactivity.

## Technologies Used

- **Vue.js:** Frontend framework for building the user interface.
- **Vuex:** State management library for Vue.js.
- **Highcharts:** Powerful charting library for data visualization.
- **Axios:** Promise-based HTTP client for making API requests.
- **Vue Cookies:** Library for managing cookies in Vue.js applications.
- **Bootstrap 5:** CSS framework for styling the user interface.
- **DataTables:** Library for creating interactive tables.
- **Moment.js:** Library for parsing, validating, manipulating, and displaying dates and times.

## Installation and Setup

1.  **Clone the repository:** `git clone <repository-url>`
2.  **Install dependencies:** `npm install`
3.  **Start the development server:** `npm run dev`

## Configuration

1.  Update `src/constants/endpoints.js` with your API endpoint URLs.
2.  Replace placeholders (e.g., `C0001`, `SECRET0001`) in `store/index.js` with your actual API credentials.

## Usage

1.  Log in using your credentials.
2.  Select the desired date range from the dropdown menu.
3.  View the sales chart and interact with it (e.g., click on columns to view detailed SKU data).

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin feature/your-feature-name`
5.  Submit a pull request.

## License

This project is licensed under the MIT License.
