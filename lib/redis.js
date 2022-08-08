import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Location extends Entity { }
let schema = new Schema(
    Location,
    {
        name: { type: 'string' },
        location: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'text', textSearch: true },
    },
    {
        dataStructure: 'JSON',
    }
);


export async function addLocation(data) {
    await connect();

    const repository = client.fetchRepository(schema)

    const car = repository.createEntity(data);

    const id = await repository.save(car);
    return id;
}

export async function addLocations() {
    await connect();

    const repository = client.fetchRepository(schema)

    const locationsArray = [
        {
            name: "Eiffel Tower",
            location: "Paris",
            image: "https://i.picsum.photos/id/866/600/300.jpg?hmac=Zlb4VEJZKg8E6U7UZGt9Mq8Ly0cZsb8ZloMpw_5WB2M",
            description: "Tower in Paris",
        },
        {
            name: "Taj Mahal",
            location: "Agra",
            image: "https://i.picsum.photos/id/866/600/300.jpg?hmac=Zlb4VEJZKg8E6U7UZGt9Mq8Ly0cZsb8ZloMpw_5WB2M",
            description: "Mahal in India",
        },
        {
            name: "Status of Liberty",
            location: "USA",
            image: "https://i.picsum.photos/id/866/600/300.jpg?hmac=Zlb4VEJZKg8E6U7UZGt9Mq8Ly0cZsb8ZloMpw_5WB2M",
            description: "Status in America",
        },
        {
            name: "Iskcon Temple",
            location: "India",
            image: "https://i.picsum.photos/id/866/600/300.jpg?hmac=Zlb4VEJZKg8E6U7UZGt9Mq8Ly0cZsb8ZloMpw_5WB2M",
            description: "Template in India",
        },
        {
            name: "Edinburgh Castle",
            location: "Scotland",
            image: "https://i.picsum.photos/id/866/600/300.jpg?hmac=Zlb4VEJZKg8E6U7UZGt9Mq8Ly0cZsb8ZloMpw_5WB2M",
            description: "Castle in Scotland",
        },
    ]

    locationsArray.forEach(async (ele) => {

        const locations = repository.createEntity(ele);
        await repository.save(locations);
    });

    return { status: 'Locations Added Successfully.' }
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);
    await repository.createIndex()
}

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


// User schema

class User extends Entity { }
let userSchema = new Schema(
    User,
    {
        name: { type: 'string' },
        password: { type: 'string' },
        relatedItems: { type: 'string[]' }
    },
    {
        dataStructure: 'JSON',
    }
);


export async function createUserIndex() {
    await connect();

    const repository = new Repository(userSchema, client);
    await repository.createIndex()
}

export async function addUsers() {
    await connect();

    const repository = client.fetchRepository(userSchema)
    const usersArray = [{
        name: "Apoorv",
        password: "Apoorv",
        relatedItems: [],
    },
    {
        name: "Apoorv Tomar",
        password: "ApoorvTomar",
        relatedItems: [],
    }]

    usersArray.forEach(async (ele) => {
        const user = repository.createEntity(ele);
        await repository.save(user);
    });

    return 'Users Created';
}

export async function getUsers(q) {
    await connect();

    const repository = new Repository(userSchema, client);
    let locations;
    if (q) {
        locations = await repository.search()
            .return.all();

    } else {
        locations = await repository.search().return.all();
    }
    return locations;
}

export async function addRelatedFeed(data) {
    await connect();
    const repository = client.fetchRepository(userSchema);
    const user = await repository.fetch(data.user.entityId);
    if (user.relatedItems.indexOf(data.feed.entityId) === -1) {
        user.relatedItems.push(data.feed.entityId)
        return await repository.save(user);
    }
    return null;

    // let userEntity;
    // if (q) {
    //     locations = await repository.search()
    //         .where('name').eq(q)
    //         .or('location').eq(q)
    //         .or('description').matches(q)
    //         .return.all();

    // } else {

}

export async function login(data) {
    await connect();
    const repository = new Repository(userSchema, client);
    let user = await repository.search()
        .where('name').eq(data.username)
        .and('password').eq(data.password)
        .return.all();
    return user;
}

export async function getRelatedFeed(entityId) {
    await connect();
    const repository = client.fetchRepository(userSchema);
    const user = await repository.fetch(entityId);
    const repositoryFeed = client.fetchRepository(schema);
    let feeds = await repositoryFeed.search()
        .return.all();
    const finalData = [];
    feeds.map((ele) => {
        if (user.relatedItems.indexOf(ele.entityId) !== -1) {
            finalData.push(ele);
        }
    });

    return finalData;
}

export async function removeFeed(entityId, userEntityId) {
    await connect();

    const repository = client.fetchRepository(userSchema);
    const user = await repository.fetch(userEntityId);
    const tempRelatedItem = user.relatedItems.filter((ele) => ele != entityId);
    user.relatedItems = tempRelatedItem;
    repository.save(user);
}