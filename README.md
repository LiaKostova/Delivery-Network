# Nemetschek Bulgaria RISE 2024 Homework

### name
Lia Kostova

### email
liakostova0210@gmail.com


<!-- 
//Process description and assumptions
Our client is the mayor and the most important thing for him is the price!
Therefore, to achieve the greatest efficiency, the goal of our program will be
to get all orders out within the day, using as few drones as possible!



//Assumption taken at the time:
1.	A day has a duration of 12 hours
2.	Distance and minutes are interchangeable therefore 1 unit of distance is equal to 1 min.
3.	Due to the lack of data regarding the price difference between drones with different capacities, we will only use the most durable type of drones.
4.	Due to the lack of data of "how fast" or more precisely "how much faster is the charging at the "fast stations", the drones will be charged at the warehouses so that no time is wasted in travel (between the drone targets and the charging stations).
5. The kilograms impact the following in our program - power wasted in 1 min (1unit) for a 5 kg order is the same as power wasted in 5min(5 units) for 1 kg.

//Stages of the application

//Part One 

We have an array to contain all our orders and their data - (nearest warehouse to the order and the corresponding distance, how many kg is the order, which is the original warehouse it was nearest to, the coordinates and customer id).
We have one “Main” object (allWarehouses) that contains as key-values - the name of each warehouse and the information we need about it:
1.	The orders it has shipped.
2.	The total distance of these orders and the time they will take.
3.	The remaining time of the day.
4.	Orders that we cannot fulfill, although they are the closest ones to this warehouse (if any).
5.	The number of additional drones.
6.	Have we used a drone or not (0-no, 1-yes).

//Part Two

In order to be the most efficient, we will always consider the orders closest to a given order warehouse first. We start the program by allocating the given orders to warehouses and seeing if each warehouse can fulfill the orders closest to it with just one drone.

If we are unsuccessful, we try to distribute these orders among the drones of the other warehouses. If we fail with that as well - then we certainly need a new drone! In this case, each warehouse and order resets its data to the moment before the failed distribution to find the original warehouse that needs the drone the most - the warehouse whose total distance of failed orders is the largest. We then check if that warehouse can fulfill all of its orders - it will be able to fulfill at least a fraction of them. If not, we try again to allocate all undelivered orders, and so on until we succeed. 
Final Part
Since our goal is to deliver all orders with as few drones as possible, we need to do another optimization.
Until now, our program has worked by allocating each order to the nearest warehouse. Therefore, at least one drone was purchased in each warehouse - to fulfill this order and possibly the next. There may have even been warehouses with 0 drones that we eliminate. Now our goal is to see if we can reallocate orders from warehouses that only used one drone.


//My test input JSON file
    -With the test inputs, we may notice that initially not every warehouse can fulfill its orders
    -I am trying to redistribute the orders to the other warehouses, but it is unsuccessful.
    -I buy a new drone -> it manages to distribute the unsuccessful orders.
    -Then in the final stage - I try to fulfill the orders of the other two warehouses (which have one order each) with fewer drones. This is successful and we distribute the orders with one less drone. -->
