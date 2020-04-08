## Viewing the Website

This website is an app reliant on Node JS as well as client side html, css, and js. This means that for some parts of the app to function properly (mainly the APIs), we will need to run the app on a *server*. 

### Why a Server?

Essentially, in this case, a server is the place where we can execute the API funcitonalities of our app. Connecting to a server to run our app as well as installing node are quite simple.

### Setting Everything Up

1. You should already have Node JS installed on your computer from the previous psets we have completed. Check by running the command `node -v` in your terminal application. If you something like `v10.16.3` (the version of Node JS), then Node JS is already installed! If you get an error of some sorts, you can install node by downloading it from the Node JS Downloads page. 

2. Next we must install the *dependencies* we need for our app. Dependencies are different packages that our app *depends* on for certain functionalities. You can see that when you cloned the repository you got a file `package.json`. If you take a look at this file, you'll see it has a section of code that looks something like this:

`"dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "node-fetch": "^2.6.0"
  }` 

This tells us exactly which dependencies we need to install in our project. Looks like we need `dotenv`, `express`, and `node-fetch`. 

3. To install, these dependencies go back to the terminal and make sure to navigate into your `create-task` folder. Once you're there run the command `npm install dotenv express node-fetch`. Once you're done with that you have everything you need to start coding!

### Viewing the Website

Ok don't worry we are almost all set up lol(we better get a 5 on this). To see the website in your browser follow these steps:

1. Open Terminal, navigate to your `create-task` folder, and run the command `node index.js`. This command starts the server and allows us to then access it. 

2. Open your browser (probably Chrome) and enter `localhost:3000` as a URL. You should see the index.html file rendered! This is how you can test and view the website.
 

