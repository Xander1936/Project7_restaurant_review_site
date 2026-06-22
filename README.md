# 🍴 Restaurant Reviews App - Douala Edition

An interactive, responsive web application built with **React** and **Material-UI** that allows users to discover, review, and manage restaurants in Douala (specifically around the Ange Raphael area). The app features a dynamic map powered by **Leaflet** and integrates with the **Foursquare API** to fetch real-world venue data.

---

## 🚀 Features

### 🗺️ Interactive Map
- **Live Map:** View restaurant locations on a high-quality map using `react-leaflet`.
- **Dynamic Centering:** Automatically centers the map based on user geolocation (if permitted).
- **Custom Markers:** Distinct markers for the map center (red) and individual restaurants (blue).
- **Map Interaction:** Click anywhere on the map to trigger a dialog for adding a new restaurant at those exact coordinates.

### 🍽️ Restaurant Management
- **Live List:** A sidebar that displays all restaurants with their images, descriptions, and average ratings.
- **Search & Filter:** 
  - Search for restaurants by name using the top search bar.
  - Filter restaurants by their star rating (e.g., show only 4-star restaurants).
- **Add New Locations:** Easily add custom restaurants with name, address, description, and an image URL.
- **Delete Functionality:** Remove restaurants from your local list with a single click.

### ⭐ Reviews & Ratings
- **Star Rating System:** Visual representation of ratings using full, half, and empty stars.
- **User Reviews:** Expand any restaurant card to view existing reviews or add your own.
- **Dynamic Updates:** Adding a review automatically recalculates the restaurant's average rating in real-time.

### 🔌 API Integration
- **Foursquare API:** Fetches nearby "food" venues based on the map's current center point to populate the app with real data.

---

## 🛠️ Tech Stack

- **Frontend:** [React.js (v17)](https://reactjs.org/)
- **UI Framework:** [Material-UI (v4)](https://v4.material-ui.com/)
- **Mapping:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Icons:** Material-UI Icons
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Deployment:** Optimized for [Vercel](https://vercel.com/)

---

## 🔧 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Xander1936/Project7_restaurant_review_site.git
   cd restaurant-reviews-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your Foursquare credentials:
   ```env
   REACT_APP_FOURSQUARE_CLIENT_ID=your_client_id
   REACT_APP_FOURSQUARE_CLIENT_SECRET=your_client_secret
   ```

4. **Run the App:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📖 Usage Guide

- **Finding Restaurants:** Browse the sidebar or use the search bar at the top right.
- **Adding a Restaurant:** 
  1. Click on the map where the restaurant is located.
  2. Fill in the "Add New Restaurant" dialog.
  3. Click **Save and Close**.
- **Adding a Review:**
  1. Click the **Expand (▼)** icon on a restaurant card.
  2. Enter your name, select a rating, and write your comment.
  3. Click **Submit Review**.
- **Filtering:** Use the dropdown in the sidebar to filter by star rating (1 to 5).

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Map.js            # Main map logic and Leaflet integration
│   ├── Map.css           # Styling for map container
│   ├── MyMarker.js       # Custom marker component for map icons
│   ├── MyRestaurants.js  # Sidebar restaurant list and review logic
│   ├── MyRestaurants.css # Styling for restaurant cards
│   └── data.json         # Initial/Sample restaurant data
├── App.js                # Root component, state management, and API calls
├── App.css               # Global application styles
└── index.js              # Entry point
public/
└── index.html            # Main HTML file with Leaflet CDN links
```

---

## 🚢 Deployment (Vercel)

This project is configured for easy deployment on **Vercel**:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. In the Vercel dashboard, add the following **Environment Variables**:
   - `REACT_APP_FOURSQUARE_CLIENT_ID`
   - `REACT_APP_FOURSQUARE_CLIENT_SECRET`
4. Deploy! Vercel will automatically detect the React build script.

---

## 📝 License

This project is for educational purposes as part of the OpenClassrooms Web Developer path.
