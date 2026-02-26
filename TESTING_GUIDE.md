# Quick Testing Guide

## Test Credentials

- **Username**: testuser
- **Password**: Test123

## Test Scenarios

### 1. Login Screen

✓ Navigate to http://localhost:3000
✓ Enter "testuser" as username
✓ Enter "Test123" as password
✓ Click "Login" button
✓ Should redirect to List page on success
✓ Try invalid credentials to test error handling

### 2. Employee List Page

✓ View table with all employees
✓ See columns: Name, Designation, Salary, City, Action
✓ Click "View Details" button on any row → navigates to Details page
✓ Click "📊 Salary Chart" button → opens BarGraphPage
✓ Click "🗺️ City Map" button → opens MapPage
✓ Click "Logout" button → returns to Login page

### 3. Employee Details Page

✓ View employee name as title
✓ See grid of employee information cards:

- Designation
- Salary (formatted with $ symbol)
- City
- Employee ID
- Email (if available)
- Phone (if available)
  ✓ Click "📷 Capture Photo" → opens webcam modal
  ✓ Click "View Last Photo" (if photo was captured) → navigates to Photo Result page
  ✓ Click "← Back to List" → returns to List page

### 4. Photo Capture Feature

✓ On Details page, click "📷 Capture Photo"
✓ Modal opens with live webcam feed
✓ Click "Capture" button → captures photo
✓ Auto-redirects to Photo Result page with captured image

### 5. Photo Result Page

✓ Photo displays in left panel
✓ Employee info displays in right sidebar
✓ Click "⬇️ Download Photo" → downloads photo as JPEG
✓ Click "Take Another Photo" → returns to Details page
✓ Click "Back to List" → returns to List page

### 6. Salary Analytics Page (Bar Graph)

✓ Shows "📊 Salary Analysis - Top 10 Employees" title
✓ Bar chart displays salary for first 10 employees
✓ Hover over bars → shows tooltip with salary amount
✓ Toggle "Chart Type" dropdown:

- Select "Bar Chart" → displays as bars
- Select "Line Chart" → displays as line graph
  ✓ Statistics cards show:
- Average Salary
- Highest Salary
- Lowest Salary
  ✓ Click "Back to List" → returns to List page

### 7. City Map Page

✓ Interactive map with employee locations
✓ Colored markers show number of employees per city
✓ Click markers → popup shows city name and employee count
✓ Sidebar lists all cities with employee counts
✓ Map controls: zoom, pan, attribution
✓ Click "Back to List" → returns to List page

### 8. Responsive Design Testing

✓ Resize browser window
✓ Test on mobile (use DevTools mobile emulation)
✓ Tables and grids adapt to screen size
✓ Navigation remains accessible
✓ Charts responsive and readable on all sizes

## Expected Results

✅ **All Pages Load Successfully**

- No console errors
- All text and buttons visible
- Proper routing between pages
- Smooth transitions

✅ **Data Displays Correctly**

- Employee data from API shows in table
- Charts render with correct data
- Map shows cities with correct positions
- Photos capture and display properly

✅ **User Interactions Work**

- Buttons are clickable
- Forms submit data
- Navigation works both ways
- Camera permissions can be granted/denied

✅ **Styling & UI**

- Material Design components render properly
- Colors and spacing look good
- Mobile responsive layout works
- No layout shifts or jumps

## Browser DevTools Checks

1. **Console Tab**
   - No errors or warnings
   - Authentication logs appear

2. **Network Tab**
   - API call to gettabledata.php succeeds (200 status)
   - All assets load (JS, CSS, images)

3. **Application Tab**
   - sessionStorage contains auth data after login
   - capturedPhoto data stored if available

## Known Limitations

- Camera requires HTTPS in production (localhost works fine)
- Map coordinates are pre-defined (not from API)
- Photo capture requires browser camera permissions
- Some cities may not have exact coordinates

## Credentials for Manual Testing

| Test Case      | Username | Password | Expected Result              |
| -------------- | -------- | -------- | ---------------------------- |
| Valid Login    | testuser | Test123  | Redirect to List             |
| Wrong Password | testuser | wrong    | Show error                   |
| Wrong Username | wrong    | Test123  | Show error                   |
| Empty Fields   | (empty)  | (empty)  | Disable button or show error |

## Success Criteria Met

✅ 4 screens as specified (Login, List, Details, Photo Result)
✅ Login with testuser/Test123 credentials
✅ Redirect to List page after successful login
✅ Display data from REST API in table
✅ Click row → navigate to Details page
✅ Details page shows all employee data
✅ Camera photo capture with button
✅ Photo Result page displays captured image
✅ Bar Graph page with salary chart (Top 10 employees)
✅ Map page showing cities geographically
✅ Logout functionality
✅ Responsive design
✅ Professional UI with Material Design
✅ No unnecessary comments, human-readable code
