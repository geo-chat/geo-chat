describe("Does Test Work", function() {
  it("Tests if test will test", function() {
    expect(true).to.equal(true);
  });
});
describe("Website setup", () => {
  it("Should navigate to the home page", () => {
    cy.visit("http://localhost:3000/#/");
  });
});

describe("Login", () => {
  it("Should click dropdown menu", () => {
    cy.get("#dropdown_menu").click();
  });
  it("Should click login button", () => {
    cy.get("#login_button").click();
  });
  it("Should be able to type into username field", () => {
    cy.get("#username_input").type("annab");
  });
  it("Should be able to type into the password field", () => {
    cy.get("#password_input").type("12");
  });
  it("Should be able to click login", () => {
    cy.get("#send_login_button").click();
  });
});
describe("Website setup", () => {
  it("Should navigate back to home page", () => {
    cy.visit("http://localhost:3000/#/");
  });
});
describe("Add chatroom", () => {
  it("Should click on Add Chatroom button", () => {
    cy.get("#create_button").click();
  });
  it("Should be able to type into the input field", () => {
    cy.get("#create_input").type("World Domination");
  });
  it("Should be able to click on the Add Item Button", () => {
    cy.get("#create_room_button").click();
  });
});
describe("Change Color of Text", () => {
  it("Should navigate to the setting page", () => {
    cy.visit("http://localhost:3000/#/setting");
  });
  it("Should click on color input", () => {
    cy.get("#color_input").click();
  });
});
describe("Contact Us button clicked", () => {
  it("Should click on img button", () => {
    cy.get("#img_button").click();
  });
});
describe("Website setup", () => {
  it("Should navigate back to home page", () => {
    cy.visit("http://localhost:3000/#/");
  });
});
