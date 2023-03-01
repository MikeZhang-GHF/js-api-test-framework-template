/**
 * This is a demo for Integration API testing using the aysnc and await feature
 * You can observe the differenc between the test automation implementation.
 * The happy path for chain of API calls:
 *    1. Create a user
 *    2. Query the user just created
 *    3. Update the user information
 *    4. Delete the user
 * Again, some test cases might be failed because of the expired token.
 * You can generate your own token for your API testing.
 */

import supertest from "supertest";
import { expect } from "chai";
import { faker } from "@faker-js/faker";


const request = supertest("https://gorest.co.in/public/v2");

// Get the token from provess.env file
require('dotenv').config();
const token = process.env.TOKEN;


// Async Integration Test
describe.only('Async CRUD Test Suites', () => {
    let userId;
    // Create User
    describe('POST /users', () => {
      it('POST /users', async () => {
        // Create an user
        const data = {
          email: faker.internet.email(),
          name: faker.name.fullName(),
          gender: faker.name.sex(),
          status: "active"
        };
    
        const res = await request
          .post("/users")
          .set("Authorization", `Bearer ${token}`)
          .send(data);
        
        expect(res.body).to.deep.include(data);
        userId = res.body.id;
        // console.log(userId);
      });
    });
  
    // Outside of describe works
    it("GET /users/:id", async () => {
      const res = await request.get(`/users/${userId}`);
      
      expect(res.body.id).to.eq(userId);
    }); 
  
    // PUT
    describe('PUT', () => {
      it('PUT /users/:id', async () => {
        const data = {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          status: "inactive"
        }     
        
        const res = await request
          .put(`/users/${userId}`)
          .set("Authorization", `Bearer ${token}`)
          .send(data);
        
        expect(res.body).to.deep.include(data);
      });   
    });
  
    // DELETE
    describe('DELETE', () => {
        it('DELETE /users/:id', async () => {
          const res = await request
            .delete(`/users/${userId}`)
            .set("Authorization", `Bearer ${token}`);
  
          expect(res.body).to.be.empty;
        });
    });
  
  });