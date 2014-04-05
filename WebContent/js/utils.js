function Util(){};

// from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
Util.isNumber = function(number)
{
    return !isNaN(parseFloat(number)) && isFinite(number);
};

// from http://www.w3schools.com/js/js_cookies.asp
Util.getCookie = function(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();

        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length,c.length);
        }
    }

    return "";
};



Util.newLineToHTMLbr = function(text)
{
    return text.replace(/\n/g, "<br/>");
};



Util.HTMLbrToNewLine = function(text)
{
    return text.replace(/<br\s*[\/]?>/gi, "\n");
};



Util.jsonNewlineToNewLine = function(text)
{
    return text.replace(/\\n/g, "\n");
};
