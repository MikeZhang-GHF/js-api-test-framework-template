/**
 * This is a demo for invidual API testing
 * using the test framework
 *    - Supertest - API request libary
 *    - Mocha - test suite excution and management
 *    - Chai - test assertion, BDD style - expect, should, TDD style - assert
 *    - Mochawsome - test result report
 * 
 * We use public API https://gorest.co.in/public/v2 for our demo. 
 * You can go to this website to register and get your own token for your test.
 * The token in this demo might be expired, you can generate your own and do your
 * own API testing.
 */

import supertest from "supertest";
import { expect } from "chai";
import { faker } from "@faker-js/faker";


const request = supertest("https://gorest.co.in/public/v2");

const TOKEN =
  "bc0c364543ce2dd6d375c1755d361bfe1ca548e5908a295c06385003a5f844b6";

//   methode I with done
describe("Test Users List", () => {
  it("GET /users/", (done) => {
    request.get("/users").end((err, res) => {
      //   console.log(res.body);
      expect(res.body).to.not.be.empty;
      done();
    });
  });
});

//   methode II without done
describe("Test Users List", () => {
  it("GET /users", () => {
    return request.get("/users").then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });
});

//   methode II without done
describe("Test /users/:id", () => {
  it("GET /users/:id", () => {
    // // old version of API
    // return request.get(`/users/946?access-token=${TOKEN}`).then((res) => {
    //   console.log(res.body);
    //   expect(res.body.data).to.not.be.empty;
    // });

    // version 2 API
    const userId = 1012;
    return request.get(`/users/${userId}`).then((res) => {
      // console.log(res.body);
      expect(res.body.id).to.eq(userId);
    });
  });

  it("GET /users with query params", () => {
    const url = "/users?page=5&gender=female&status=active";
    return request.get(url).then((res) => {
      expect(res.body).to.not.be.empty;
      res.body.forEach((element) => {
        expect(element.gender).to.eq("female");
        expect(element.status).to.eq("active");
      });
    });
  });
});

//   POST
describe("POST /users", () => {
  const data = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    gender: faker.name.sex(),
    status: "active"
  };

  it("POST /users Authorization Failed", () => {
    return request
      .post("/users")
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.body.message).to.eq("Authentication failed");
      });
  });

  it("POST /users", () => {
    return request
      .post("/users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.body).to.deep.include(data);
      });
  });

  // PUT users
  it('PUT /users/:id', () => {
    const userId = 1012;

    const data = {
      status: "inactive"
    }

    return request
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.status).eq(data.status)
      })
  });
});