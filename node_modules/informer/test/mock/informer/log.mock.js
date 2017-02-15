
var should = require("chai").should();

function Log()
{

};

Log.prototype = {

    colorName: null,

    messageText: null,

    titleText: null,


    color: function(colorName)
    {
        colorName.should.be.a("string");
        colorName.should.equal(this.colorName);

        return this;
    },

    echo: function()
    {
        "test".should.be.ok;
    },

    message: function(messageText)
    {
        messageText.should.be.a("string");
        messageText.should.equal(this.messageText);

        return this;
    },

    title: function(titleText)
    {
        titleText.should.be.a("string");
        titleText.should.equal(this.titleText);

        return this;
    }
};

module.exports = Log;