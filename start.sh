#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Starting Fanbase..."

# Go to project
cd ~/fanbase-backend

# Start backend in background
echo "Starting backend..."
node server.js &

# Wait a bit so backend connects
sleep 3

# Start frontend
echo "Starting frontend..."
cd frontend
python -m http.server 3000 &

sleep 2

echo "✅ Fanbase is running!"
echo "👉 Open: http://127.0.0.1:3000"
