# Restaurant Reviews App

An interactive web application built with React that allows users to discover, review, and manage restaurants on a map.

## 🚀 Features

- **Interactive Map:** View restaurant locations on a dynamic map powered by Leaflet.
- **Restaurant Management:** 
    - Browse a list of restaurants with images, descriptions, and ratings.
    - Search for specific restaurants by name.
    - Filter restaurants based on their average rating.
    - Delete restaurants from the list.
- **Reviews & Ratings:**
    - View detailed reviews for each restaurant.
    - Add new reviews with customer names and comments.
    - Visual star rating system (full, half, and empty stars).
- **Add New Restaurants:** Simply click on the map to add a new restaurant location with its details (name, address, description, etc.).
- **Responsive UI:** Built with Material-UI for a modern and responsive user experience.

## 🛠️ Technologies Used

- **Frontend Framework:** [React](https://reactjs.org/)
- **UI Components:** [Material-UI (v4)](https://v4.material-ui.com/) & [MUI (v5)](https://mui.com/)
- **Mapping Library:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Icons:** Material-UI Icons
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Styling:** CSS & Emotion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd restaurant-reviews-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app running.

## 📖 Usage

- **Viewing Restaurants:** The sidebar lists available restaurants. Clicking on a restaurant in the list or a marker on the map will show more details.
- **Filtering:** Use the search bar at the top to find restaurants by name, or use the rating filter in the sidebar to narrow down results.
- **Adding a Restaurant:** Click anywhere on the map. A dialog will appear asking for the restaurant's details. Fill them in and save to add it to the map and list.
- **Adding a Review:** Expand a restaurant's card in the sidebar, fill out the review form, and submit.

## 🧪 Running Tests

To run the available tests, use:
```bash
npm test
# or
yarn test
```

## 🏗️ Project Structure

- `src/components/`: Contains the main React components (Map, MyRestaurants, MyMarker, etc.).
- `src/App.js`: The main entry point and layout of the application.
- `public/`: Static assets and the main HTML file.
- `src/components/restaurantsData.json`: Sample data for restaurants.
