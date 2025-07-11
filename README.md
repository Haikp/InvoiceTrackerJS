# Invoice Tracker
This was a commissioned project, and my first time using JS to make a website.

## Prerequisites
- Node.js v18.19.1
- [Node.js](https://nodejs.org/) (version 18.19.1 or higher)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/) (optional)
- Drivers installation version of MongoDB

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Haikp/InvoiceTrackerJS.git
cd InvoiceTrackerJS
```

### 2. Install dependencies
```bash
npm run build
```

### 3. Create New Cluster on MongoDB
When creating a new cluster, select the Driver version for Mongo installation, create the credentials and make sure to copy the Mongo_URI
- using npm
- ```bash
  npm install mongodb
  ```

You will need to get an API Key to allow automatic IP address whitelisting (if you are using the .bat script on windows)
- click on your profile on the top right > organizations
- select your organization
- on the left side, click on access manager
- on the right side, swap to project access manager settings
- switch to the applications tab > API Keys, and create API Key
- set a name, and 'project owner' permissions is needed
- get the public and private key for later use
You will also need the Project ID
- click on 'Atlas' top left to view all your projects
- on the corresponding project, see actions on the right side and click on copy project ID

### 4. Create .env File
Inside, use variable names MONGO_URI, PORT, ATLAS_PUBLIC_KEY, ATLAS_PRIVATE_KEY, and ATLAS_PROJECT_ID respectively
- Note: the atlas public key, private key, and project id is mainly for if you want to use the script, the script is also only for windows, if you want to use this project on other platforms, you just need to whitelist your own ip address in your project.
```bash
MONGO_URI=mongodb+srv://...
PORT=desired port number
ATLAS_PUBLIC_KEY=publickey
ATLAS_PRIVATE_KEY=privatekey
ATLAS_PROJECT_ID=projectid
```

### 6. Run Build
if on linux:
```bash
npm run start
```

if on windows:
```bash
npm run windows
```
or run start.bat file
