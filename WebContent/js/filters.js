// AngularFilters module
var angularFilters = angular.module("AngularFilters", []);



// CheckmarkFilter filter
angularFilters.filter("CheckmarkFilter",
    function()
    {
        return function(bool_text)
        {
            return bool_text ? "\u2713" : "\u2718";
        };
    }
);



angularFilters.filter("NewLineToHTMLbrFilter",
    function()
    {
        return function(text)
        {
            if(typeof(text) === "undefined")
            {
                return "";
            }

            return Util.newLineToHTMLbr(text);
        };
    }
);



angularFilters.filter("HTMLbrToNewLineFilter",
    function()
    {
        return function(text)
        {
            if(typeof(text) === "undefined")
            {
                return "";
            }

            return Util.HTMLbrToNewLine(text);
        };
    }
);



angularFilters.filter("JsonNewlineToNewLineFilter",
    function()
    {
        return function(text)
        {
            if(typeof(text) === "undefined")
            {
                return "";
            }

            return Util.jsonNewlineToNewLine(text);
        };
    }
);



angularFilters.filter("ImagePathFilter", [
    "SessionService",
    function (SessionService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return SessionService.getImagePathFromProduct(product);
        };
    }
]);



angularFilters.filter("ReferenceURLFilter", [
    "SessionService",
    function (SessionService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return SessionService.getReferenceURLFromProduct(product);
        };
    }
]);
