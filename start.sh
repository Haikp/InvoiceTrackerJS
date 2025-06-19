# Linux/Mac/WSL Exclusive
#!/bin/bash

# Change this to your actual project path
PROJECT_DIR="$HOME/projects/InvoiceTracker"

cd "$PROJECT_DIR" || {
  echo "❌ Project directory not found: $PROJECT_DIR"
  exit 1
}

echo "Checking for updates..."
git_output=$(git pull)

if [[ "$git_output" == *"Already up to date."* ]]; then
    echo "No updates found."
else
    echo "Updates pulled. Rebuilding..."
    npm run build
fi

if [ ! -d "node_modules" ]; then
  echo "First time setup: Installing dependencies..."
  npm install
fi

echo "Building the project..."
npm run build

echo "Starting the server..."
npm run start &
sleep 2
xdg-open http://localhost:3000 &> /dev/null