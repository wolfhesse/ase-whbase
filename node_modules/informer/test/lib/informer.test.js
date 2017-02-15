
var should      = require("chai").should(),
    suite       = require("../suite"),
    informer    = require(suite.path("informer")),
    LogMock     = require(suite.mock("informer/log.mock")),
    TitleMock   = require(suite.mock("informer/title.mock")),
    titleStub   = "title",
    messageStub = "message",
    colorStub   = "green";

describe("informer", function(){

    beforeEach(function() {

        informer.titleManager            = new TitleMock();
        informer.titleManager.titleText  = titleStub;
        informer.titleManager.titleColor = colorStub;
        informer.log                     = new LogMock();
        informer.log.titleText           = titleStub;
    });

    describe("error", function() {

        it("shoud echo error message", function() {

            informer.log.colorName   = "red";
            informer.log.messageText = "Error:"+" "+messageStub;
            informer.error(messageStub);
        });
    });

    describe("info", function() {

        it("shoud echo info message", function() {

            informer.log.colorName   = "blue";
            informer.log.messageText = "Info:"+" "+messageStub;
            informer.info(messageStub);
        });
    });

    describe("loading", function() {

        it("shoud echo loading message", function() {

            informer.log.colorName   = "grey";
            informer.log.messageText = messageStub+"...";
            informer.loading(messageStub);
        });
    });

    describe("title", function() {

        it("shoud set title text in title manager", function() {

            informer.title(titleStub);
        });
    });

    describe("titleColor", function() {

        it("shoud set title color in title manager", function() {

            informer.titleColor(colorStub);
        });
    });

    describe("success", function() {

        it("shoud echo success message", function() {

            informer.log.colorName   = "green";
            informer.log.messageText = "Success:"+" "+messageStub;
            informer.success(messageStub);
        });
    });

    describe("warning", function() {

        it("shoud echo warning message", function() {

            informer.log.colorName   = "yellow";
            informer.log.messageText = "Warning:"+" "+messageStub;
            informer.warning(messageStub);
        });
    });

});