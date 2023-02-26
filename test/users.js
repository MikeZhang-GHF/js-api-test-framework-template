import supertest from "supertest";
import { expect } from "chai";
import { faker } from "@faker-js/faker";


// const request = supertest("https://gorest.co.in/public-api");
const request = supertest("https://gorest.co.in/public/v2");

const TOKEN =
  "68f36352c03196dc804ee7ccb784037ffcdd09bd8223a6a6a32b836005ba80bb";

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
    // return request.get(`/users/946?access-token=${TOKEN}`).then((res) => {
    //   console.log(res.body);
    //   expect(res.body.data).to.not.be.empty;
    // });

    return request.get("/users/946").then((res) => {
      // console.log(res.body);
      expect(res.body.id).to.equal(946);
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
        expect(res.body.email).eq(data.email);
        expect(res.body.status).eq(data.status);
      });
  });
});
