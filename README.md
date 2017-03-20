# HOTEL WEBSITE
This repository contains my project which is a Hotel website built with MEAN Stack (using Node.js, AngularJS, Express and MongoDB)
The website includes the following modules:
 - User registration, login and the controller authentication functionalities.
 - Displaying the list of the existing hotels.
 - Displaying, creating and updating information for a particular hotel.
 - Displaying, creating and updating the customer reviews for a hotel.
 
## Installation
### Prerequisites
- __NodeJS__: [Download Link](https://nodejs.org/en/download/current/)
- __MongoDB__: [Download Link](https://www.mongodb.com/download-center#community)

### Running from the command line
- Please get the source code from the [link](https://github.com/anhit07/MEAN-STACK-LEARNING/tree/master/MEAN%20STACK/MEAN):
- Then download the database gzip files from [link](https://github.com/anhit07/MEAN-STACK-LEARNING/tree/master/MEAN%20STACK/Mongo_Database/meanhotel)
- Start MongoDB server $ mongod
- Import database to the Mongo Shell from the folder stores the database gzip file
      
      - $ mongorestore --db meanHotel --gzip dbDirPath 
    
    EX: $ mongorestore --db meanHotel --gzip C:\MongoDB\meanhotel
    
    - Check database by running
      
      - $ mongo
      
      - > show dbs
     
    - If meanHotel database exist, check the collections in it
     
     - > use meanHotel
     
     - > db.hotels.find().pretty()
- Running the project on Node.js command line:
- Change into the folder where the project source code located. 
    Ex: $ cd hotel-project
- Install the dependencies: $ npm install
- Check the website on web browser : http://localhost:3000
	
## Built with
- __MongoDB__ - [Open-source cross-platform NoSQL database program](https://www.mongodb.com/)
- __ExpressJS__ - [Web application framework for Node.js,designed for building web applications and APIs](http://expressjs.com/)
- __AngularJS__ - [JavaScript-based open-source Front-End web application framework](https://angularjs.org/)
- __NodeJS__ - [Server-side JavaScript environment](https://nodejs.org/en/)

