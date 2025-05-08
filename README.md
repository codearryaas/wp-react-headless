# WP React Headless

## Setup 
### `npx create-react-app wp-react-headless`
Run above script to setup React app.

### `npm install @wordpress/date react-router-dom @uidotdev/usehooks`
Install dependencies

### `.env.local`
Create above file in root folder. and add following config.

`REACT_APP_API_URL=http://YOUR-SITE.local/wp-json/`

Update above url to your WP setup url.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
