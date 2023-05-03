const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");

// Configure chai
chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
	server.then((result) => {
		app = result;
		done();
	});
});

describe("Books Operation", () => {
	describe("GET /catalog/Books", () => {
		it("+ should return a list of books", (done) => {
			chai.request(app)
				.get("/catalog/Books")
				.end((error, response) => {
					try {
						response.should.have.status(200);
						response.body.value.should.be.an("array").to.have.lengthOf(5);
						done();
					} catch (error) {
						done(error);
					}
				});
		});
	});
});