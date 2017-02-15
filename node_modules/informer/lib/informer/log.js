
var color = require("./color");

function Log()
{

};

Log.prototype = {

    logColor: '',

    logMessage: '',

    logTitle: '',

    color: function(colorName)
    {
        this.logColor = color.getValid(colorName);

        return this;
    },

    echo: function()
    {
        console.log(this.getEchoMessage());
    },

    getEchoMessage: function()
    {
        return this.logTitle+" "+this.logMessage[this.logColor];
    },

    message: function(messageText)
    {
        this.logMessage = messageText;

        return this;
    },

    title: function(titleText)
    {
        this.logTitle = titleText;

        return this;
    }
};

module.exports = Log;