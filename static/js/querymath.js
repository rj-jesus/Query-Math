$(document).ready(function () {
    $('#result').hide();
    $('#btn-query').click(function () {
        var input = $('#input-query').val();
        querymath(input);
    });
    $('#input-query').keyup(function(event){
        if(event.keyCode == 13) $('#btn-query').click();
    });
    $('#btn-result').click(function() {
        $('#result-fix').hide();
        $('#result').hide();
    });
});

function querymath(query) {
    $.get('/query?', {'input': query}, function (data) {
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, 'text/xml');
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(data);
        }
        var text = '';
        pod = xmlDoc.getElementsByTagName('pod');
        for (var i = 0; i < pod.length; i++) {
            text += '<h3>' + pod[i].getAttribute('title') + '</h3>\n';
            img = pod[i].getElementsByTagName('img');
            for (var j = 0; j < img.length; j++) text += '<img src=\"' + img[j].getAttribute('src') + '\" ' + 'alt=\"' + img[j].getAttribute('alt') + '"><br>';
        }
        $('#result-fix').show();
        window.scrollTo(0, document.getElementById('result-fix').offsetTop);
        $('#result-text').html(text);
        $('#result').show();
    });
}