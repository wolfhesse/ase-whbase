

function Title()
{

};

Title.prototype = {

    titleColor: null,

    titleText: null,

    getColor: function()
    {
        return this.titleColor;
    },

    getText: function()
    {
        return this.titleText;
    },

    setColor: function(colorName)
    {
        colorName.should.be.a("string");
        colorName.should.be.equal(this.titleColor);

        return this;
    },

    setText: function(titleText)
    {
        titleText.should.be.a("string");
        titleText.should.be.equal(this.titleText);

        return this;
    }

};

module.exports = Title;