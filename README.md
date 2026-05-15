
# AggieLink  

## Overview  
Have you ever wanted to find a volleyball team to join or a study partner for your chemistry class? **AggieLink** makes it easy for UC Davis students to connect with others who share their interests.  

With AggieLink, you can create and join hangout groups ranging from boba runs to basketball open gyms. Using the Google Maps API, you can effortlessly pick convenient locations to meet and connect with your new friends.  

So what are you waiting for? Head to the link below and create your first AggieLink group to start building connections with your fellow UC Davis Aggies!  

---

## Features  
- **Find Groups**: Discover hangout groups based on your interests, from sports to coffee runs.  
- **Create Groups**: Don’t see what you’re looking for? Create your own group and invite others to join!  
- **Location Integration**: Easily choose meetup locations using Google Maps.  
- **Filter Activities**: Use filters to sort activities by categories like food, sports, or study sessions.  

---

## How to Use AggieLink  
1. **Access the Website**:  
   Go to [AggieLink](https://aggielink.vercel.app/).  

2. **Create an Account**:  
   - Click the **Login** button.  
   - Sign up with your email and password.  

3. **Explore Activities**:  
   - Browse activities that interest you, or use the filter option to narrow down results (e.g., sports, coffee, food).  
   - Click on an activity to view details like location, date, and other group members.  

4. **Create Your Own Group**:  
   - If you don’t see a group that matches your interests, create one by specifying:  
     - Event name  
     - Location  
     - Group size  
     - Time range  

5. **Join the Fun**:  
   - Wait until your group’s scheduled time, head to the location, and enjoy your hangout session!  

---

## Installation Instructions (For Local Development)  

### Prerequisites  
- **Node.js**: Download and install [Node.js](https://nodejs.org/).  
- **MongoDB**: Set up a local or cloud-based MongoDB instance (e.g., using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).  

### Steps  
1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/your-repo/aggielink.git
   cd aggielink
   ```

2. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and include the following:
   ```env
   MONGO_URI=your_mongo_database_connection_string
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. **Install Backend Dependencies**:  
   Navigate to the backend folder:
   ```bash
   cd backend
   npm install
   ```

4. **Run the Backend Server**:  
   Start the backend server:
   ```bash
   npm start
   ```

5. **Install Frontend Dependencies**:  
   Navigate to the frontend folder:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Run the Frontend Application**:  
   Start the frontend server:
   ```bash
   npm run dev
   ```

7. **Access the Application**:  
   Open your browser and navigate to `http://localhost:3000` to use AggieLink locally.

---

## Tools and Technologies  
AggieLink is a fully deployed web application built using modern web development tools:

- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB, a non-relational document-based database, to store and manage group data.
- **Google Maps API**: Integrates location functionality for a seamless user experience.

---

## Engineers
- joomey
