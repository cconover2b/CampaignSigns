# Software and Dependencies List

To run this Next.js application effectively and efficiently, you'll need to install and set up the following software and dependencies:

## Core Software

1. **Node.js**: Version 18.17.0 or later
   - Required for running JavaScript on the server
   - Download from: https://nodejs.org/

2. **npm** (Node Package Manager): Typically comes with Node.js
   - Used for managing project dependencies

3. **Git**: Latest version
   - For version control and collaboration
   - Download from: https://git-scm.com/

## Database

4. **MongoDB**: Version 5.0 or later
   - NoSQL database used for storing application data
   - Download from: https://www.mongodb.com/try/download/community

## Development Environment

5. **Visual Studio Code** (recommended, but any modern IDE will work)
   - Efficient code editing with TypeScript support
   - Download from: https://code.visualstudio.com/

## Project Dependencies

Install these dependencies using npm. They are listed in your `package.json` file:

6. **Next.js**: ^14.2.4
   - React framework for building the application

7. **React**: ^18
   - JavaScript library for building user interfaces

8. **React DOM**: ^18
   - React package for working with the DOM

9. **TypeScript**: ^4.9.5
   - Typed superset of JavaScript

10. **Mongoose**: ^7.5.3
    - MongoDB object modeling for Node.js

11. **Firebase**: ^10.5.2
    - Used for image storage and retrieval

12. **@googlemaps/js-api-loader**: ^1.16.6
    - Loader for Google Maps JavaScript API

13. **next-auth**: ^4.24.7
    - Authentication for Next.js applications

14. **bcrypt-ts**: ^5.0.2
    - Library for hashing passwords

15. **yup**: ^1.4.0
    - JavaScript schema builder for value parsing and validation

16. **formik**: ^2.4.6
    - Form library for React

17. **react-toastify**: ^10.0.5
    - Toast notifications for React

18. **@tanstack/react-table**: ^8.15.0
    - Headless UI for building powerful tables & datagrids

19. **react-icons**: ^5.0.1
    - Popular icons for React projects

20. **react-spinners**: ^0.14.1
    - Loading spinners for React

21. **lucide-react**: ^0.331.0
    - Icon library for React

## UI and Styling Dependencies

22. **Tailwind CSS**: ^3.3.0
    - Utility-first CSS framework

23. **PostCSS**: ^8
    - Tool for transforming CSS with JavaScript

24. **Autoprefixer**: ^10.0.1
    - PostCSS plugin to parse CSS and add vendor prefixes

25. **@radix-ui** components:
    - Various UI primitives (e.g., dialog, popover, checkbox)

26. **class-variance-authority**: ^0.4.0
    - Library for creating variant classes

27. **clsx**: ^2.1.0
    - Utility for constructing className strings

28. **tailwind-merge**: ^2.2.1
    - Utility function to merge Tailwind CSS classes

29. **tailwindcss-animate**: ^1.0.7
    - Plugin for Tailwind CSS animations

## Development Dependencies

30. **ESLint**: ^8
    - Tool for identifying and reporting on patterns in JavaScript

31. **eslint-config-next**: 14.1.0
    - ESLint configuration used by Next.js

32. **@types/react**: ^18
    - TypeScript types for React

33. **@types/react-dom**: ^18
    - TypeScript types for React DOM

34. **@types/node**: ^20
    - TypeScript types for Node.js

35. **@types/google.maps**: ^3.55.5
    - TypeScript types for Google Maps API

## Additional Software

36. **Google Cloud Platform Account**
    - For accessing Google Maps API
    - Set up at: https://cloud.google.com/

37. **Firebase Account**
    - For image storage functionality
    - Set up at: https://firebase.google.com/

## Environment Setup

38. Environment Variables:
    - Create a `.env.local` file in the root of your project with the following variables:
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

## Installation Steps

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Set up your MongoDB database and update the `MONGODB_URI` in `.env.local`
4. Set up Google Maps API and Firebase, and add the respective keys to `.env.local`
5. Run `npm run dev` to start the development server

Remember to keep your Node.js, npm, and all dependencies up to date for optimal performance and security.