# customer_ticketing


[![obasajujoshua31](https://circleci.com/gh/obasajujoshua31/customer_ticketing.svg?style=svg)](https://app.circleci.com/pipelines/github/obasajujoshua31/customer_ticketing)



[Database Design](https://dbdesigner.page.link/v1j6cyS1D3syh87z5)


Steps to setup the project

1. Download Docker from [here](https://www.docker.com/products/docker-desktop) if already don't have docker installed.

2. clone the project using either https or ssh
- with https:  git clone https://github.com/obasajujoshua31/customer_ticketing
- with ssh git clone git@github.com:obasajujoshua31/customer_ticketing.git

3. Create a file called .env in the root directory and copy the contents of .env.example into it and fill in your details.
 

4. Run `docker-compose up` - to start the services. This include 

- [Redis](redis.io)
- [Mongo Database](mongodb.com)
- [Express Api application](expressjs.com)
- [Mongo Express application](https://github.com/mongo-express/mongo-express)

5. Start application at port 6000 and navigate to http://localhost:5000/api-docs for the API documentation

`Note: If you are starting your application in a different port, go to swagger.json and change the host to the port you are using`


6.. Assumptions

- All customers can create requests.
- Customers whose accounts have been deactivated cannot login nor create requests.
- All support agents can view all requests
- Customers can only view their own requests
- Admin can view all requests
- Support agents can assign themselves to request that is pending
- Support agents can only close requests that is their own.
- Support agents can not cancel requests.
- Admin can cancel only pending requests.
- Customer can cancel only their requests and only pending.
- Customer and agents can only comment on request that are active.


6. Feedback - a Relational Database could have been better for a data that is related like this. 

7. Default agent account - `agent@agent.com` and password `agent`
            admin account - `admin@admin.com` and password `admin`
