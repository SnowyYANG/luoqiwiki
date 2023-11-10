function colorBlock(r,g,b,str) {
    var fc = 0.2126*r + 0.7152*g + 0.0722*b>128 ? '#000000' : '#FFFFFF';
    return '<div class="mcblock" style="background-color:rgb('.concat(r,',',g,',',b,');color:',fc,'">',str,'</div>');
}

var more;
function morecolor() {
    var beacon = new FormData();
    beacon.append("type", colors);
    beacon.append("color", search);
    beacon.append("more", more);
    navigator.sendBeacon('/api/dye-colors-track', beacon);
    more++;
    var r = [];
    for (num = i; i<results.length && (i<num+100 || results[i][3] === results[i-1][3]); ++i)
        r.push(colorBlock(results[i][0],results[i][1],results[i][2],'#'+(0x1000000 | results[i][2] | (results[i][1] << 8) | (results[i][0] << 16)).toString(16).substr(1)));
    if (i < results.length) r.push('<div onclick="this.outerHTML = morecolor()" class="mcblock" style="background:#f0f0f0;color:#6699cc;cursor:pointer">更多颜色</div>');
    return r.join('');
}

var results;
var i;
var colors = 'cloth';
var search;

for(const radio of document.getElementsByName("c")) {
    radio.onchange = function() {
		colors = this.value;
        document.getElementById('palette').src = 'https://ik.imagekit.io/snowyyang/luoqiwiki/'+colors+'.png';
    };
}

document.forms[0].onsubmit = function() {
    searchColor();
    return false;
};

function searchColor() {
    if (!(search = document.getElementsByName("s")[0].value)) return false;
    /*var xhr = new XMLHttpRequest();
    if (xhr) {
        xhr.open('GET','/mc?c='+encodeURIComponent(colors)+'&s='+encodeURIComponent(search));
        xhr.send();
    }*/
    var ss = search.split(' ');
    results = [];
	var _colors = window[colors];
    for (var ci in _colors) {
        var c = _colors[ci];
        var match = true;
        for (var si in ss) {
            var s = ss[si];
            if (s.match(/^[RGB][<>=]=?[+-0-9]+$/i)) {
                num = parseInt(s.substring(s[2]==='='?3:2));
                a = c[(s[0] === 'R' || s[0] === 'r')?0:(s[0] === 'G' || s[0] === 'g')?1:2];
                match &= (s[1] === '='|| s[2] === '=') ? a === num : s[1] === '<' ? a < num : a > num;
            }
		}
        if (match) {
			c[3] = ci;
			results.push(c);
		}
    }
    for (var si in ss) {
        var s = ss[si];
		var S;
        if (S = s.match(/[0-9a-f]{6,8}/i)) {
			S = parseInt(S[0],16);
            var R = (S >> 16) & 0xff;
            var G = (S >> 8) & 0xff;
            var B = S & 0xff;
            for (var ci in results) {
                var c = results[ci];
                c[3] = 2*Math.pow(c[0]-R,2)+4*Math.pow(c[1]-G,2)+3*Math.pow(c[2]-B,2);
            }
            results.sort(function(a,b) { return a[3]-b[3]; });
            break;
        }
    }
    var r = [];
    if (S) r.push(colorBlock(R,G,B,'目标颜色'));
    if (results.length) {
		i = 0;
        more = 0;
        r.push(morecolor());
    }
	else r.push('<div>没有找到任何颜色</div>');
    document.getElementById('r').innerHTML = r.join('');
};
