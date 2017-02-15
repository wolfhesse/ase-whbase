
var should = require("chai").should(),
    suite  = require("../../suite"),
    Log    = require(suite.path("informer/log"));

describe("Log", function(){

    describe("getEchoMessage", function() {

        it("shoud title and message string", function() {

            var log = new Log();
            log.color("red")
               .message("message")
               .title("title");
            log.getEchoMessage().should.equal("title \u001b[31mmessage\u001b[39m");
        });
    });
});