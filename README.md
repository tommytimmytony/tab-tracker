# tab-tracker
Link : https://tabs-tracker.herokuapp.com/

I work at a small family restaurant, so I thought it would be cool to create a simple EPOS system for us to used. 

# App functions 
The app has three page - MENU , ORDERS, and HISTORY.
The user could switch and operate on only one page at a time.

# MENU
This page display all the menu item name and price.
Each individual item name and price are place on a square box I called tabs. 
There a plus tabs at the very end where user could add more item. 
Pressing the edit button will alot user to delete the tabs. 
The Hold button will save the customer orders and move it to the ORDERS page. 

# ORDERS
This page display all the orders that had been place. 
You could click on the order tabs and it will display the orders.
When click on a order tab you could move back to the MENU page to add more or delete items to the current order.

# HISTORY
This page keep all the orders that has been paid. 
It showcase the time and date of when the orders was paid. 

# ERROR
This app has alot of problems.
The biggest problems, I believe, is the database. All data are sent to a single database in MongoDB atlas. Therefore, if one person change something then everyone will see it. This app could not be used for mutiple business. If I want to delete the orders or history tabs then I have to manually go into the code and deleted from there. 
The code still need some more clean up, especially in TabsContext.js. 

# LEARN
My first REACT project. I was able to play with the database, API, HTTPS, and alot more. 
