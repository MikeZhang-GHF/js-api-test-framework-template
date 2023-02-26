import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public-api");

const TOKEN =
  "68f36352c03196dc804ee7ccb784037ffcdd09bd8223a6a6a32b836005ba80bb";

//   methode I with done
describe("Users", () => {
  it("GET /users", (done) => {
    request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body.data).to.be.not.empty;
      done();
    });
  });
});

//   methode II without done
describe("Users", () => {
    it("GET /users", () => {
      request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
        expect(res.body.data).to.be.not.empty;
      });
    });
  });
