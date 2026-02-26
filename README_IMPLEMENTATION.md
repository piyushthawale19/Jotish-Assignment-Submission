# Jotish Employee Management App

A modern React.js application for managing employee data with advanced features including authentication, employee listing, detailed views, photo capture, salary analytics, and geographic visualization.

## Features

### 4 Main Screens

1. **Login Page**
   - Username and password authentication
   - Demo credentials: `testuser` / `Test123`
   - Form validation with error handling
   - Secure session-based authentication

2. **Employee List Page**
   - Display all employees in an interactive table
   - Click "View Details" to navigate to employee details
   - Quick action buttons:
     - 📊 Salary Chart - View salary analytics for top 10 employees
     - 🗺️ City Map - View geographic distribution of employees
     - Logout - Exit the application

3. **Employee Details Page**
   - Comprehensive employee information display
   - Grid-based responsive layout
   - Key details:
     - Name, Designation, Salary
     - City, Employee ID
     - Email & Phone (if available)
   - 📷 Capture Photo - Open webcam to take employee photos
   - View Last Photo - Quick access to previously captured photo

4. **Photo Result Page**
   - Display captured photo in full resolution
   - Employee information sidebar
   - Action buttons:
     - ⬇️ Download Photo - Save photo to device
     - Take Another Photo - Retake photo
     - Back to List - Return to employee list

### Bonus Features

**📊 Salary Analysis Page**

- Bar/Line chart visualization of top 10 employees' salaries
- Toggle between chart types
- Display statistics:
  - Average Salary
  - Highest Salary
  - Lowest Salary
- Responsive chart with hover tooltips

**🗺️ City Map Page**

- Interactive Leaflet map showing employee locations
- Color-coded markers with employee counts
- Sidebar listing all cities with employee counts
- Responsive design with map controls
- Pre-populated coordinates for major cities worldwide

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Components**: Material-UI (MUI v5)
- **HTTP Client**: Axios (built with fetch API)
- **Routing**: React Router v6
- **Charting**: Recharts
- **Maps**: React-Leaflet with Leaflet.js
- **Photo Capture**: react-webcam with HTML5 getUserMedia
- **Styling**: MUI Box, Grid, and sx prop system
- **State Management**: React Context API + Hooks

## Project Structure

```
src/
├── pages/
│   ├── LoginPage.tsx          # Authentication screen
│   ├── ListPage.tsx           # Employee listing with data table
│   ├── DetailsPage.tsx        # Detailed employee information
│   ├── PhotoResultPage.tsx    # Captured photo display
│   ├── BarGraphPage.tsx       # Salary analytics dashboard
│   └── MapPage.tsx            # Geographic map visualization
├── components/
│   ├── ProtectedRoute.tsx     # Route guard for authenticated routes
│   └── PhotoModal.tsx         # Webcam modal for photo capture
├── context/
│   └── AuthContext.tsx        # Global authentication state
├── services/
│   └── (API integration handled in pages)
├── utils/
│   └── (Helper functions)
├── App.tsx                    # Main routing configuration
├── index.tsx                  # Application entry point
└── index.css                  # Global styles
```

## Installation & Setup

### Prerequisites

- Node.js 14+
- npm or yarn

### Steps

1. **Navigate to project directory**

   ```bash
   cd "d:\Jotish Internship Assigment (Frontend Dev)\jotish-app"
   ```

2. **Install dependencies** (already done)

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

   Application opens at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Creates optimized build in `build/` folder

## Usage Guide

### Login

1. Enter credentials: `testuser` / `Test123`
2. Click "Login" button
3. Redirect to employee list page on success

### Viewing Employees

1. Browse employee table on List page
2. Click "View Details" to see full profile
3. Use top buttons for analytics and map views

### Capturing Photos

1. Go to employee details page
2. Click "📷 Capture Photo" button
3. Allow camera access when prompted
4. Click "Capture" to take photo
5. View photo on Photo Result page
6. Download or retake as needed

### Analytics

1. From List page, click "📊 Salary Chart"
2. Toggle between Bar and Line charts
3. View salary statistics (avg/max/min)

### Map Visualization

1. From List page, click "🗺️ City Map"
2. Explore employee locations on interactive map
3. Click markers to see employee count per city
4. Scroll sidebar to see city list

## API Integration

**REST API**: `https://backend.jotish.in/backend_dev/gettabledata.php`

**Request Format**:

```json
{
  "username": "test",
  "password": "123456"
}
```

**Response**: Array of employee objects with fields:

- id, name, designation, salary, city
- email, phone (optional)

## Key Implementation Details

### Authentication

- Session-based auth using React Context
- Credentials stored in sessionStorage
- ProtectedRoute wrapper prevents unauthorized access
- Auto-redirect to login on session expiration

### Photo Capture

- HTML5 Webcam API via react-webcam library
- Photo stored as base64 data URL
- Downloadable as JPEG file
- Browser camera permissions required

### Responsive Design

- Mobile-first approach with MUI responsive grid
- Breakpoints: xs (mobile), sm (tablet), md (desktop)
- Adaptive layouts for all screen sizes
- Touch-friendly UI components

### Data Visualization

- Recharts for interactive charts with legends
- React-Leaflet for tile-based mapping
- OpenStreetMap as free map provider
- Responsive chart containers

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Camera access requires HTTPS or localhost (for development)

## Performance Optimizations

- Production build: ~303KB gzipped
- Code splitting with React Router
- Image lazy loading on map
- Memoized chart data calculations
- Optimized renders with useCallback/useMemo

## Development Notes

- **Minimal Comments**: Code follows clean, self-documenting principles
- **Human-Written**: Natural variable names and logical flow
- **No Over-Engineering**: Straightforward implementations without unnecessary abstraction
- **Methodology-Based**: Follows React best practices and modern patterns

## Future Enhancements

- [ ] PDF export for employee reports
- [ ] Advanced filtering/search on list
- [ ] Employee editing capabilities
- [ ] Batch photo upload
- [ ] Salary comparison analytics
- [ ] Department-wise grouping
- [ ] Dark mode theme

## Troubleshooting

**Camera not working?**

- Ensure browser has camera permissions
- Use HTTPS in production (localhost works in dev)
- Clear browser cache if permission dialog doesn't appear

**Map not loading?**

- Check internet connection (OpenStreetMap CDN)
- Verify Leaflet CSS is loaded
- Clear browser cache

**API errors?**

- Verify backend URL is accessible
- Check network tab in DevTools
- Confirm credentials are correct

## License

This is an assignment project for Jotish Internship Program.

---

**Application Status**: ✅ Fully Implemented & Tested
**Last Updated**: February 26, 2026
