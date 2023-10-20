## Run uncontained
>Note: you should have MongoDB running on port 27017.
```bash
cd api && npm start
cd ../webapp && npm start
```

Ports
* Backend: http://localhost:5000
* Frontend: http://localhost:3000
* Database: http://0.0.0.0:27017

## Build and run Docker image locally
>Note: you should have free port 27017 for docked MongoDB.

```bash
docker-compose up --build
```

Ports
* Backend: http://localhost:5000
* Frontend: http://localhost:3000
* Database: http://0.0.0.0:27017

## Run application in production
By the time you test the application, the service must be up and running and available under the tuni VPN.

Ports
* Backend: http://172.16.101.22:4000
* Frontend: http://172.16.101.22:80
* Database: http://172.16.101.22:27017

Otherwise, you need to re-trigger CI pipeline and gitlab CI will re-deploy the application.
