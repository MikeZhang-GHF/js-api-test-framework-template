/**
 * This is a demo for Integration API testing
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

// Integration Test
describe('CRUD Test Suites', () => {
  let userId;
  // Create User
  describe('POST /users', () => {
    it('POST /users', () => {
      // Create an user
      const data = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        gender: faker.name.sex(),
        status: "active"
      };
  
      return request
        .post("/users")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send(data)
        .then((res) => {
          expect(res.body).to.deep.include(data);
          userId = res.body.id;
        });
    });
  });

  // Outside of describe works
  it("GET /users/:id", () => {
    return request.get(`/users/${userId}`).then((res) => {
      expect(res.body.id).to.eq(userId);
    });
  }); 

  // PUT
  describe('PUT', () => {
    it('PUT /users/:id', () => {
      const data = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        status: "inactive"
      }     
      
      return request
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data)
        .then((res) => {
          expect(res.body).deep.include(data);
        })
    });   
  });

  // DELETE
  describe('DELETE', () => {
      it('DELETE /users/:id', () => {
        return request
          .delete(`/users/${userId}`)
          .set("Authorization", `Bearer ${token}`)
          .then((res) => {
            expect(res.body).to.be.empty;
          })
      });
  });

});
