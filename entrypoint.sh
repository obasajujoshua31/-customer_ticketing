yarn seed:data 

if [ $NODE_ENV = "development" ] 
then yarn start
else 
yarn test
fi
