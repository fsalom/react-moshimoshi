export var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "GET";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["DELETE"] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
export var ContentType;
(function (ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["XML"] = "text/xml; charset=utf-8";
    ContentType["IMAGE"] = "image/jpeg";
    ContentType["FORM"] = "application/x-www-form-urlencoded";
    ContentType["NONE"] = "";
})(ContentType || (ContentType = {}));
