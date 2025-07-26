<h1 align="center">
  💪 <span style="font-weight:bold;">FitnessTrack</span>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/🚀%20Project-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/🧬%20Stack-MERN-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=A+Modern+Fitness+Tracker+App;Built+with+MERN+Stack;Track+Progress+%7C+Stay+Fit+%7C+Stay+Motivated!&center=true&width=800&height=45&color=0ED3CF&vCenter=true&size=20" alt="Typing SVG" />
</p>

---

<p align="center">
  🚴‍♂️ <b>FitnessTrack</b> is a stylish, full-stack web application to log workouts, visualize progress, and stay on top of your fitness goals. Built with <strong>MERN</strong>, it blends powerful backend APIs with a clean modern frontend.
</p>

---

## 🌟 Demo

> 🚧 Live demo coming soon...

---

## 🧠 Features

- 🔐 **JWT Auth** – Secure sign-up/login flow
- 📋 **Workout Logging** – Add/edit/delete workouts
- 📈 **Analytics** – Weekly & category-wise tracking
- 🎥 **Tutorials** – Curated workout videos embedded from YouTube
- 📰 **Blogs** – Read fitness tips and motivational articles
- 💅 **Tailwind UI** – Clean, responsive design
- ⚛️ **Redux Toolkit** – Smooth state management
- 🌐 **RESTful API** – Built with Express & MongoDB

---

## 🗂 Project Structure

<details>
<summary>📁 <strong>Click to expand</strong></summary>

<br>

<pre>
<code>
FitnessTrack/ ├── client/        # React + Tailwind frontend
             │   ├── src/        # Main source
             │   ├── components/ # Reusable components
             │   ├── pages/      # Dashboard, Blogs, etc.
             │   ├── redux/      # userSlice, store
             │   └── utils/      # Assets, themes
             │
             └── public/        # Static HTML & icons

             ├── server/        # Node.js backend
                 ├── controllers/ # Logic for user/workouts
                 ├── models/      # Mongoose schemas
                 ├── routes/      # API endpoints
                 ├── middleware/  # JWT verification
                 ├── .env         # Secrets & config
                 └── index.js     # App entry
</code>
</pre>

</details>

---

## 🔧 Setup Instructions

### 📌 Prerequisites

- Node.js v18+
- MongoDB Atlas/local
- npm or yarn

### ⚙️ Backend Setup

```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_secret
npm start

```

### 🎨 Frontend Setup

``` bash
cd client
npm install
npm start
```

---

### 🛠 Built With

| Tech        | Description                 |
| ----------- | --------------------------- |
| ⚛️ React    | Frontend library            |
| 🎨 Tailwind | Utility-first CSS framework |
| 🧠 Redux    | State management            |
| 🟢 Node.js  | JS runtime environment      |
| 🚀 Express  | Web framework for Node      |
| 🍃 MongoDB  | NoSQL database              |
| 🛡 JWT      | Secure authentication       |


---

### 💡 Future Enhancements
 - User profile and avatar support
 - Workout history export (PDF/CSV)
 - Social feed to share progress
 - PWA support for offline tracking

 ---
 
### 📬 Contact
Made with ❤️ by Nitesh Singh
