# Trip Collaborator

### About the project.
Trip Collaborator is an application which will help solve the biggest problem of booking a trip amongst friends, family and relatives.

### Problem Statement.

While we are planning for our next getaway, normally we have lots of places in our mind. These suggestion we either get it from various  platforms but managing them is a bit of a concern.

The thought behind Trip Collaborator is to make that hustle easier, two users should easily be able to share location. There are various features that can be implemented along with these.

I will add scope to which this project can be extended in scope section. If anyone interest can submit a pull request.

### Screenshots of the application
#### Login Page

![Login Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q8h2kir57sjiwlhewxpp.png)

#### Feed Home page

![Feed Home Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oo1v6vokxfh43xp436gf.png)

#### Referred Feed Home page

![Referred Feed Home page!](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4ky8cnk772nkm3vqhy42.png)

---

### Tech Stack (Language Used)
#### Frontend:
JavaScript, React, fetch(ajax), Redis-OM, sass, lodash
#### Backend:
JavaScript, Next.js, Redis-OM

---
### Architecture Diagram

![Overall Architecture Diagram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3czqcf34nbhhhrj5t1lm.png)

![Flow Diagram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/epp1tn4z0q9sg52tk8ge.png)

---
--- 
How it works?

### Describes how you store the data
We have used Redis as out database. Redis supports various datatypes, but we will be storing the data as JSON. Which will help us replicate the most common no sql database nowadays i.e. MongoDB.

The data in redis will have two schemas as follow. One for location and other for user.

#### Location Schema

```
    Location,
    {
        name: { type: 'string' },
        location: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'text', textSearch: true },
    }
```
#### User Schema

```
  User,
    {
        name: { type: 'string' },
        password: { type: 'string' },
        relatedItems: { type: 'string[]' }
    }
```

As we have used redis-om so for storing the data we have to create repository which we help us in creating the entity used to store the data.
Following is method used to save data in location

```
export async function addLocation(data) {
    await connect();
    const repository = client.fetchRepository(schema)
    const car = repository.createEntity(data);
    const id = await repository.save(car);
    return id;
}
```
Following is the screenshot from Redis Insight, which is a UI tool giving a interface for keeping track of stored data.

![Redis Insight](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fhoicroczzs8d1us9waa.png)
 

### Describes how you read the data

Now once we were successful in storing the data to our redis cloud database. It was time to query the data. 

We have fetched the data using following command. The once which we will be discussing is about the search functionality that can be found on feed page as show in screenshot below.

![Feed Page Screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ykl6pphy21v1vhbcimvb.png)


```
export async function searchLocation(q) {
    await connect();

    const repository = new Repository(schema, client);
    let locations;
    if (q) {
        locations = await repository.search()
            .where('name').eq(q)
            .or('location').eq(q)
            .or('description').matches(q)
            .return.all();

    } else {
        locations = await repository.search().return.all();
    }


    return locations;
}
```

Here you will observe we have used search function provided. For filtering the data we have where and or function where we can provide our conditions.

---
### Additional Resources / Info
- [lodash ](https://www.npmjs.com/package/lodash)
- [redis-om ](https://www.npmjs.com/package/redis-om)
- [sass ](https://www.npmjs.com/package/node-sass)
- [next ](https://www.npmjs.com/package/next)

---

### How to run it locally?

### Prerequisites
 - Node.js 12.22.0 or later
 - MacOS, Windows, Linux

### Local installation
-  Run the following command for installing the packages

```bash
 npm install 
```

- Run the development server:

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000/internal](http://localhost:3000/internal) with your browser to see the result.

- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

----



## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
