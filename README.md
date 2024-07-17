# Campaign Signs Management System

## Purpose Statement

The Campaign Signs Management System is a robust, full-stack web application designed to streamline the process of managing and tracking campaign signs for political or marketing campaigns. This system allows campaign managers and field workers to efficiently handle the lifecycle of campaign signs, from initial placement to removal or replacement.

Key features include:
- Real-time tracking of sign locations using Google Maps integration
- Ticket system for sign placement, maintenance, and removal requests
- User authentication and role-based access control
- Dashboard with statistics and data visualization
- Mobile-responsive design for field use
- Photo upload capabilities for visual verification

This application aims to reduce the time and resources spent on managing physical campaign assets, ensure compliance with local regulations, and provide valuable insights into the effectiveness of sign placement strategies.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
3. [Software and Dependencies](#software-and-dependencies)
4. [Environment Setup](#environment-setup)
5. [Running the Application](#running-the-application)
6. [Contributing](#contributing)
7. [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.17.0 or later)
- npm (usually comes with Node.js)
- Git
- MongoDB (version 5.0 or later)

You will also need accounts for:
- Google Cloud Platform (for Google Maps API)
- Firebase (for image storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/campaign-signs-management.git
   cd campaign-signs-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Setup](#environment-setup) section below).

## Usage

After installation and setup, you can use the application to:

1. Create and manage user accounts for campaign staff.
2. Add new sign locations by creating tickets with GPS coordinates.
3. Upload photos of signs for visual verification.
4. Track the status of signs (new, placed, needs maintenance, removed).
5. Generate reports on sign distribution and effectiveness.
6. Assign tasks to field workers for sign placement or maintenance.

Detailed usage instructions for each feature can be found in the application's help section once you're logged in.

## Software and Dependencies

### Core Software

1. **Node.js** (Version 18.17.0 or later)
   ```bash
   # Using nvm (recommended)
   nvm install 18.17.0
   nvm use 18.17.0

   # Or download and install from https://nodejs.org/
   ```

2. **npm** (Comes with Node.js)
   ```bash
   # Update npm to the latest version
   npm install -g npm@latest
   ```

3. **Git**
   ```bash
   # On Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install git

   # On macOS using Homebrew
   brew install git

   # On Windows, download from https://git-scm.com/download/win
   ```

### Database

4. **MongoDB** (Version 5.0 or later)
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install gnupg
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org

   # On macOS using Homebrew
   brew tap mongodb/brew
   brew install mongodb-community@5.0

   # On Windows, download from https://www.mongodb.com/try/download/community
   ```

### Development Environment

5. **Visual Studio Code** (recommended, but any modern IDE will work)
   ```bash
   # On Ubuntu/Debian
   sudo snap install --classic code

   # On macOS using Homebrew
   brew install --cask visual-studio-code

   # On Windows, download from https://code.visualstudio.com/
   ```

### Project Dependencies

The following dependencies will be installed automatically when you run `npm install`:

- Next.js
- React and React DOM
- TypeScript
- Mongoose
- Firebase
- @googlemaps/js-api-loader
- next-auth
- bcrypt-ts
- yup
- formik
- react-toastify
- @tanstack/react-table
- react-icons
- react-spinners
- lucide-react
- Tailwind CSS and related utilities
- @radix-ui components
- Development dependencies (ESLint, type definitions, etc.)

## Environment Setup

Create a `.env.local` file in the root of your project:

```bash
touch .env.local
```

Add the following variables to `.env.local`, replacing the placeholder values with your actual credentials:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Contributing

We welcome contributions to the Campaign Signs Management System! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.