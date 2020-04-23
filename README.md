# Sources

Please put your sources here:

* https://developer.mozilla.org/en-US/
* https://youtu.be/17UVejOw3zA
* https://openweathermap.org/forecast5
* https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/


## Website Set Up

This website is an app reliant on Node JS as well as client side html, css, and js. This means that for some parts of the app to function properly (mainly the APIs), we will need to run the app on a __server__. 

### Why a Server?

Essentially, in this case, a server is the place where we can execute the API funcitonalities of our app. Connecting to a server to run our app as well as installing node are quite simple.

### Setting Everything Up

1. You should already have Node JS installed on your computer from the previous psets we have completed. Check by running the command `node -v` in your terminal application. If you get something like `v10.16.3` (the version of Node JS), then Node JS is already installed! If you get an error of some sorts, you can install Node JS by downloading it from the Node JS Downloads page. 

2. Next we must install the __dependencies__ we need for our app. Dependencies are different packages that our app __depends__ on for certain functionalities. You can see that in the repository there is a file `package.json`. If you take a look at this file, you'll see it has a section of code that looks something like this:

`"dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "node-fetch": "^2.6.0"
  }` 

This tells us exactly which dependencies we need to install in our project. Looks like we need `dotenv`, `express`, and `node-fetch`. I'll explain what these packages are for in a bit.

3. To install these dependencies, go back to the terminal and make sure to navigate into your `create-task` folder. Once you're there run the command `npm install dotenv express node-fetch`. 

4. Our Weather API we are using requires an API key. This key has been stored in a file on my computer, however, I did not upload it to Github. This is to ensure the security of our key (basically one should not share API keys publicly because then someone could use it and you would get billed). To get the key on your computer, navigate into the `create-task` directory, and run the command `touch .env`. This creates a file on your computer to store environment variables. Open this file in a code editor and enter `API_KEY='YOUR_API_KEY'`(I will inform you of the real API key id privately).

### Viewing the Website

Ok don't worry we are almost all set up lol (we better get a 5 on this). To see the website in your browser follow these steps:

1. Open Terminal, navigate to your `create-task` folder, and run the command `node index.js`. This command starts the server and allows us to then access it. 

2. Open your browser (probably Chrome) and enter `localhost:3000` as a URL. You should see the index.html file rendered! This is how you can test and view the website.


## Important Notes
-__What ever you do please do not upload the `.env` file to GitHub!__ This should already be taken care of because of the 
`.gitignore` file, however, just be mindful.

