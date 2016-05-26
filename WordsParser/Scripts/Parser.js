
parse = function (text) {
    if (text.match(/\w+/g) == null) return [];
    var sentences = text.split(".");

    var words = [];
    for (var i = 0, j = 0; i < sentences.length; i++) {
        var parsedWords = sentences[i].match(/\w+/g);
        if (parsedWords != null) {
            words[j] = parsedWords;
            words[j].sort(function (a, b) { return a.toUpperCase() > b.toUpperCase() });
            j++;
        }
    }
    return words;
}

parseXML = function (text) {
    var words = parse(text);

    var result = "< xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> \n";

    result = result.concat("<text> \n");

    for (var s = 0; s < words.length; s++) {

        result = result.concat("\t <sentence> \n");

        for (var w = 0; w < words[s].length; w++) {
            result = result.concat("\t\t <word>");
            result = result.concat(words[s][w]);
            result = result.concat("</word> \n");
        }

        result = result.concat("\t </sentence> \n");
    }
    result = result.concat("</text>");

    return result;
}

parseCSV = function (text) {
    var words = parse(text);

    var result = "";

    var maxLength = 0;
    for (var s = 0; s < words.length; s++) {
        if (words[s].length > maxLength) {
            maxLength = words[s].length;
        }
    }

    for (var i = 0; i < maxLength; i++) {
        result = result.concat(", Word ");
        result = result.concat(i + 1);
    }

    result = result.concat('\n');

    for (var s = 0; s < words.length; s++) {
        result = result.concat("Sentence ");
        result = result.concat(s + 1);
        for (var w = 0; w < words[s].length; w++) {
            result = result.concat(", ");
            result = result.concat(words[s][w]);
        }

        result = result.concat('\n');
    }

    return result;
}


$(document).ready(function () {
    $("#parseXMLButton").click(function () {
        $("#result").text(parseXML($("#input").val()));
    });
    $("#parseCSVButton").click(function () {
        $("#result").text(parseCSV($("#input").val()));
    });
});