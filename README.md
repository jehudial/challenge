# Coding Challenge

Created using Vite and NPM under Node version 20.11.2.  To run, clone or fork the repository.  
```  
npm install 
npm run dev 
```
## Libraries used
```
"@emotion/babel-plugin": "^11.11.0",
"@emotion/react": "^11.11.4",
"@emotion/styled": "^11.11.5",
"@mui/icons-material": "^5.15.15",
"@mui/material": "^5.15.15",
"@mui/x-data-grid": "^7.1.1",
"@mui/x-date-pickers": "^7.2.0",
"@tanstack/react-query": "^5.29.0",
"axios": "^1.6.8",
"dayjs": "^1.11.10",
"formik": "^2.4.5",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.22.3",
"yup": "^1.4.0"
```
## Code Ogranization

- Axios instance and tanstack Queryclient are placed in a seperate file with the basic CRUD API calls used.
- React Router (createBrowserRouter or createHashRouter is used utilizing the object model rather than the route component.  Children and outlets are used for page navigation
- Clean imports at top of files, broken down into libraries for easy readability
- File Structure is broken in Pages and components 




