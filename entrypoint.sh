if [ $NODE_ENV = "test" ] 
then yarn test
else 
yarn seed:data
yarn start
fi
