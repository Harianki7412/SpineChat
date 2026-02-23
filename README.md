# 🎥 SpineChat

SpineChat is a modern random video chat application built with:

- ⚡ Next.js (Frontend)
- 🔌 Socket.IO (Real-time Matching)
- 🎥 ZegoCloud (Video Calling)
- 🚀 Node.js + Express (Backend)

It connects two random users instantly for 1-on-1 video chat.

---

# 📦 Tech Stack

## client
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Socket.IO Client
- Zego UIKit Prebuilt

## socket
- Node.js
- Socket.IO
- UUID
- HTTP Server

---


---

# 🚀 Installation Guide

---

# 🔹 1️⃣ socket Setup

### 📂 Go to backend folder

```bash
cd backend

📦 Install dependencies
npm install
🔑 Create .env
PORT=8000
▶️ Start Server
npm run dev

Server will run on:

http://localhost:8000

 🔹 2️⃣ client Setup

 📂 Go to frontend folder

cd frontend

📦 Install dependencies
npm install
🔑 Create .env.local
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_ZEGO_APP_ID=YOUR_ZEGO_APP_ID
NEXT_PUBLIC_ZEGO_SERVER_SECRET=YOUR_ZEGO_SECRET

⚠️ Restart after editing env file.

▶️ Run Frontend
npm run dev

Open:

http://localhost:3000

🎯 How Matching Works

User clicks Start Chat

Backend adds user to waiting queue

When 2 users available:

Server creates room ID

Both users join same room

Zego starts video call

If user clicks "Next":

Current session ends

New match begins

🛡 Environment Variables
Frontend .env.local
Variable	Description
NEXT_PUBLIC_SOCKET_URL	Backend server URL
NEXT_PUBLIC_ZEGO_APP_ID	Zego Project App ID
NEXT_PUBLIC_ZEGO_SERVER_SECRET	Zego Server Secret
Backend .env
Variable	Description
PORT	Server Port
⚠️ Important Notes

Make sure Zego project region is Global

If deploying:

Frontend (HTTPS)

Backend must also use HTTPS / WSS

Restart server after changing environment variables

🌍 Deployment
Frontend

Recommended:

Vercel

Netlify

Backend

Recommended:

Railway

Render

VPS

Make sure:

NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.com
🧠 Future Improvements

🔐 Backend token generation (secure Zego auth)

👤 Gender filter

🎤 Mute / Camera toggle

🌐 Country-based matching

🛡 Moderation system

💬 Text chat feature

📱 Progressive Web App support

👨‍💻 Author

SpineChat — Random Video Chat Platform

Built with ❤️ using Next.js + Socket.IO + ZegoCloud


---

# 🎯 Want More Professional?

If you want I can also:

- Add API documentation section
- Add architecture diagram
- Add production deployment guide (Vercel + Railway)
- Add Docker setup
- Add secure Zego backend token system
- Make enterprise-level README

Tell me what level this project is:
- 🎓 College project  
- 🚀 Startup MVP  
- 💰 Production app  

I’ll customize it accordingly.
