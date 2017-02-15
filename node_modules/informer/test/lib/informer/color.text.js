
var should = require("chai").should(),
    suite  = require("../../suite"),
    color  = require(suite.path("informer/color"));

describe("color", function(){

    describe("getValid", function() {

        it("shoud return valid color", function() {

            color.getValid("red").should.equal("red");
            color.getValid("aaa").should.equal("rainbow");
        });
    });
});