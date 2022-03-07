# Typescript implementation of the task
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics/tscript
npm install
tsc
node dist/task.js
````

# HTML implementation
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics
````
open task.html with browser

# Vanilla JavaScript implementation of the task - optional
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
minikube config set memory 8000 && \
minikube config set cpus 4 && \
minikube config set driver docker && \
minikube start
minikube addons enable ingress
````
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics
skaffold dev
````
````
minikube ip
````
Add minikube ip into /etc/hosts file
````
192.168.49.2    supermetrics.sys
````
Navigate to http://supermetrics.sys

# GraphQL
Console can be accessed dependently on the environment http://localhost:4000/graphql or http://supermetrics.sys/graphql
````
mutation {
  loginUser( input: {
    client_id: "ju16a6m81mhid5ue1z3v2g0uh",
    email: "your@email.address",
    name: "Your Name"
  }) {
    status, statusText, sl_token
  }
}
````
````
query { generateRandomPosts {id, from_name, from_id, message, type, created_time} }
````
````
query { fetchSupermetricsPosts(sl_token: "xxxxxx" ) {id, from_name, from_id, message, type, created_time} }
````
````
query { averageCharactersLengthOfPostsPerMonth { month,  averageCharacterLength} }
````

