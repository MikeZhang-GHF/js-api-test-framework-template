import supertest from "supertest";
import { expect } from "chai";
import { createRandomPost } from "../util/data_generator";

const request = supertest("https://gorest.co.in/public/v2");
const TOKEN =
  "bc0c364543ce2dd6d375c1755d361bfe1ca548e5908a295c06385003a5f844b6";

describe('User Posts', () => {
    const userId = 1050;
    let postId;
    let postData;

    // fixture, before hooks: before the execution of test suite
    // the setup for running test suites
    // generate test data in our test case, but another example, before test other function login first
    before(async () => {
        const post = await createRandomPost(userId);
        postId = post.id;
        postData = {
            title: post.title,
            body: post.body
        }
    });

    // Test endpoint /users/:id/posts 
    it('POST /users/:id/posts', async () => {
        console.log(postData);
        const res = await request
            .post(`/users/${userId}/posts`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(postData);

        console.log(res.body);          
        expect(res.body).to.deep.include(postData);
        postId = res.body.id;
    });

    it('GET /posts/:id', async () => {
        const res = await request
            .get(`/posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(postId);
    });
});