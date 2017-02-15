
var _ = require("underscore");

var colorOptions = [
    'bold',
    'italic',
    'underline',
    'inverse',
    'yellow',
    'cyan',
    'white',
    'magenta',
    'green',
    'red',
    'grey',
    'blue',
    'rainbow',
    'zebra'
];

var defaultColor = "rainbow";

module.exports = {

    getValid: function(color)
    {
        return _.indexOf(colorOptions, color) === -1
            ? defaultColor
            : color;
    }
};