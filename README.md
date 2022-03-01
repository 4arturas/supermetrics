# Console implementation of the task
````
git clone git@github.com:4arturas/supermetrics.git
cd supermetrics/server
npm install
node index.js
````

# Web implementation of the task
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

# DevOps implementation
````
node -r dotenv/config index.js
````
````
nodemon server.js
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

