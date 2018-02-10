# bamazon
An amazon-inspired inventory tracker made with MySQL. The app takes in orders from customers and depletes stock from bamazon's inventory.

## Demo - Customer experience
Records in **products** database before shopping transactions:   
![Screenshot](/screenshots/bamazonDemo1.png)
<br />  
Prompting shopper to enter *SKU* and available *quantity*:
![Screenshot](/screenshots/bamazonDemo2.png)
<br />  
Confirmaton of valid *quantity* based on active *inventory* and quoting total *price*:
![Screenshot](/screenshots/bamazonDemo3.png)
<br />  
Records in **products** database after successful shopping transaction:
![Screenshot](/screenshots/bamazonDemo4.png)
<br />  
Response to shopper request for higher *quantity* than available *inventory*:
![Screenshot](/screenshots/bamazonDemo5.png)
<br />  
Records in **products** database unchanged after unsuccessful shopping transaction:
![Screenshot](/screenshots/bamazonDemo6.png)
<br />  
