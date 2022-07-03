# Money-Saving-Platform

##### Problem Statement
Create a money saving platform where users can be able to do the following activities:
- Create account
- Being able to do daily saving. Required fields includes date, amout and you
can add description which should be optional.
- Someone can not do multiple saving per day (Only one record per day
needs to be stored)
Note: It’s is not Mandatory to do saving for each and everyday, user can skip a day
but can not save for the past day.
- Can be able to fetch the paginated list of savings history
- Should be able to download a report (Excel or PDF file) including list of all
saving history in a provided interval. (Providing interval is required)

##### Requirements
- NodeJs Version 14+
- NPM Version 6+

##### Setting up the project for development
* Clone the repo :  
   ```
   $ git clone https://github.com/PaulKitonyi/Money-Saving-Platform.git
   ```
* Navigate to the cloned folder  
   ```
   $ cd Money-Saving-Platform/
   ```
* Run:  
   `$ npm i`  
   * This will install project dependencies.
* Run:  
   ```
   $ node/nodemon index.js
   ``` 
   to start the application.
   
##### Documentation
[Postman API documentation](https://documenter.getpostman.com/view/5625695/UzJFuxqu)
