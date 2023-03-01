/***
 *  This module provides the functions for generating random data for testing
 *  for example generate random user, generate random posts
 */

import { faker } from "@faker-js/faker";

export const createRandomUser = async () => {
    // Create an user
    const data = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        gender: faker.name.sex(),
        status: "active"
    };

    const res = await request
        .post("/users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);
    
    // console.log(res.body);
    return res.body;
}

export const createRandomPost = async (userId) => {
    const postData = {
        user_id: userId,
        title: faker.lorem.words(),
        body: faker.lorem.text()
    };

    const res = await request
        .post(`/users/${userId}/posts`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(postData);

    // console.log(res.body);
    return res.body;
};

