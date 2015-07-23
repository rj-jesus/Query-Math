$(document).ready(function () {
    $('#result').hide();
    $('#btn-query').click(function () {
        var input = $('#input-query').val();
        querymath(input);
    });
    $('#btn-result').click(function() {
        if($('#result_text').is(':visible')){
            $('#btn-result').html('Show');
            $('#result_text').hide();
        }
        else{
            $('#btn-result').html('Hide');
            $('#result_text').show();
        }
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
        console.log(xmlDoc);
        var text = '';
        // console.log(xmlDoc.getElementsByTagName('pod')[0].getAttribute('title'));
        pod = xmlDoc.getElementsByTagName('pod');
        for(var i = 0; i < pod.length; i++){
            text += '<h3>' + pod[i].getAttribute('title') + '</h3>\n';
            img = pod[i].getElementsByTagName('img');
            for(var j = 0; j < img.length; j++) text += '<img src=\"' + img[j].getAttribute('src') + '\" ' + 'alt=\"' + img[j].getAttribute('alt') + '"><br>';
        }
        $('#result_text').html(text).show();
        $('#result').show();
        $('#btn-result').html('Hide');
    });
}