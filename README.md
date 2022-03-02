# Console implementation of the task
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics/server
npm install
node task.js
````

# Web implementation of the task - optional
## Backend: nodejs+express
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics/server
npm install
npm run dev
````
## Fronted: React
````
cd supermetrics/client
npm install
npm start
````
Navigate to http://localhost:3000/

# DevOps implementation - optional
- Install docker https://docs.docker.com/get-docker/
- Install minikube https://minikube.sigs.k8s.io/docs/start/
- Install skaffold https://skaffold.dev/docs/install/
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics
skaffold dev
````
````
minikube ip
````



````
node -r dotenv/config index.js
````
````
nodemon server.js
````

# GraphQL
Console can be accessed dependently on environment http://localhost:5001/graphql or http://supermetrics.sys/graphql
````
query { generateRandomPosts {id, from_name, from_id, message, type, created_time} }
````
````
query { fetchSupermetricsPosts(sl_token: "xxxxxx" ) {id, from_name, from_id, message, type, created_time} }
````
````
query { averageCharactersLengthOfPostsPerMonth { month,  averageCharacterLength} }
````

