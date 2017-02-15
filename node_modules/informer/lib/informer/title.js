
var _     = require("underscore"),
    color = require("./color");

var titleColor = "green",
    titleText  = "[informer]";

function Title()
{

};

Title.prototype = {

    getColor: function()
    {
        return titleColor;
    },

    getText: function()
    {
        return titleText[this.getColor()];
    },

    setColor: function(colorName)
    {
        titleColor = color.getValid(colorName);

        return this;
    },

    setText: function(title)
    {
        if (!_.isEmpty(title)) {
            titleText = "[" + title + "]";
        }

        return this;
    }

};

module.exports = Title;