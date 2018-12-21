(function(){

function getList(url,divId,reverse){
    superagent
        .get(url)        
        .end(function(err, res){
            if (err || !res.ok) {
                console.log(err);
            } else {
                var boxes = [];
                res.body.items.forEach(function(video){
                    boxes.push({
                        title       : video.snippet.title,
                        subtitle    : video.snippet.description,
                        description : '',
                        url         : 'https://www.youtube.com/embed/' + video.snippet.resourceId.videoId,
                        video       : true,
                        thumbnail   : 'http://img.youtube.com/vi/' + video.snippet.resourceId.videoId + '/mqdefault.jpg'
                    }); 
                });
                buildFancyBoxes(boxes,divId,reverse);
            }
        });
}

function buildFancyBoxes(boxes,divId,reverse){
    // if empty, do nothing
    if (boxes.length<1) return;

    // reverse order
    if(reverse) boxes = boxes.reverse();

    // start container
    var html = '';

    // add boxes
    boxes.forEach(function(item,i){

        // content
        if (i%4 === 0) html += '<div class="row" style="margin: 25px;">';
        html += '<div class="col-md-3">';
        html += '  <div class="card card-blog">';
        html += '    <a data-fancybox="gallery" href="' + item.url + '">';
        html += '      <div class="video-thumbnail">';
        html += '        <img class="card-img-top" src="' + item.thumbnail + '" alt="poster" >';
        html += '      </div>';
        html += '    </a>';
        html += '    <div class="card-body">';

        if (item.title) html += '<h4 class="card-title">' + item.title + '</h4>';
        if (item.subtitle) html += '<h5 class="card-title text-muted">' + item.subtitle + '</h5>';
        if (item.description) html += '<p class="card-text">' + item.description + '</p>';

        html += '    </div>';
        html += '  </div>';
        html += '</div>';        
        if (((i+1)%4) === 0) html += '</div>';

    });

    // close container
    html += '';

    // set html
    document.getElementById(divId).innerHTML = html;    
}

var divId1 = 'promo';
var url1 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLI-z6o9BMa6ODdrFipM6Fv_yZ-OuTm4tW&key=AIzaSyBYHeAYuBuLqKZh3PLH072iYISd3-UT1vM';
getList(url1, divId1,true);

var divId2 = 'tas';
var url2 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLI-z6o9BMa6OvQ6YMcN7Hdr2IacT5z3QM&key=AIzaSyBYHeAYuBuLqKZh3PLH072iYISd3-UT1vM';
getList(url2, divId2,false);

})();