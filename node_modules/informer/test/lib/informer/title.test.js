
var should = require("chai").should(),
    suite  = require("../../suite"),
    Title  = require(suite.path("informer/title")),
    title  = null;

describe("Title", function(){

    beforeEach(function() {

        title = new Title();
    });

    describe("setColor", function() {

        it("shoud set color", function() {

            title.setColor("blue");
            title.getColor().should.equal("blue");
        });
    });

    describe("setText", function() {

        it("shoud set text", function() {

            title.setText("text");
            title.setColor("blue");
            title.getText().should.equal("\u001b[34m[text]\u001b[39m");
        });
    });
});