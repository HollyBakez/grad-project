# :mortar_board: CPSC 597 grad-project
CPSC 597 Graduate Graduate Repository

# :moneybag: FINSTAB: Financial Stability & Budgeting
This application is my CSUF MSE Graduation Project.

It serves as a one stop shop for users to be able to add budget categories and their expenses.
In addition it provides budgeting tools such as an expenses calculator and savings goal calculator.

The expenses calculator allows users to input their gross salary and receive a breakdown of how they should allocate their income in order to properly address their essential expenses, retirement contributions, emergency funds, and discretionary spending.

The savings goal calculator allows users to input their target savings goal and the target date they would like to achieve their target by and receive a breakdown of how much they will need to save per month and for how many months in order to achieve their goal.

## :hammer: Tech Stack :wrench:
The client/presentation layer is handled by:
- React.js
- Typescript/Javascript

The application layer is handled by:
- Node.js (Server)
- Express.js (Server)
- Mongoose as the Object data model (ODM) tool

The database layer is handled by:
- MongoDB Atlas (NoSQL Cloud Database Service)

## :pushpin: How to run :clipboard:
Clone the repository
```
git clone https://github.com/HollyBakez/grad-project.git
```
Navigate into cloned repo
```
cd ~/grad-project
```
### :computer: To run client, navigate into client directory
```
cd client
```
Install client node dependencies
```
npm i
```
Run client
```
npm run dev
```
### 📡 To run server, navigate into server directory
```
cd server
```
Create a ```.env``` configuration file in server directory to declare ```PORT=4000``` and ```MONGO_URI=<your_mongo_uri>``` to use
```
# Create your .env file
touch .env

# Edit .env and add PORT=4000 and MONGO_URI=<your_mongo_uri> values
vim .env 
```
Install server node dependencies
```
npm i
```
Run server
```
npm run dev
```

## :star: You're almost there! :panda_face:
Open up a browser and navigate to the url 
```
http://localhost:5173/
```
:exclamation: NOTE: The client (UI) port number is set to 5173 by default. If 5173 is already in use or you changed the configuration to use another port, change the url port to the one that the terminal shows when running ```npm run dev``` in the client directory.


