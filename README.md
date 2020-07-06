# customer_ticketing


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
