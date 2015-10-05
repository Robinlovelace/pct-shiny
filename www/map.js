var animationSpeed = 50;
var w = 1105;
var h = 765;
var rand;
var paper = new Raphael('paper');
paper.setViewBox(0, 0, w, h, true);
paper.canvas.setAttribute('preserveAspectRatio', 'none');

var availableRegions = ['Leeds', 'Manchester', 'Norfolk', 'Coventry'];

var hoverStyle = {
  fill: "hsb(.8, .5, .5)",
  "stroke-width": 1.5,
};
var unavailableStyle = function(){
  var r = Math.random() * 10 + 215;
  var g = Math.random() * 10 + 215;
  var b = Math.random() * 10 + 215;
  return {
    fill: "rgb("+r+","+g+","+b+")",
    stroke: "#aaa",
    "stroke-width": 0.75,
    "opacity": 0.25,
    "stroke-linejoin": "round"
  };
};

var availableStyle = function(rand) {
  var h = rand/100 + 0.795;
  return {
    fill: "hsb("+h+", 1, 1)",
    stroke: "#aaa",
    "stroke-width": 0.75,
    "stroke-linejoin": "round",
    "opacity": 0.5,
    cursor: "pointer"
  };
};

var styleRegion = function (region, name) {
  if(availableRegions.indexOf(name) > -1){
    rand = Math.random();
    region[0].addEventListener("mouseover", function() {
      region.animate(hoverStyle, animationSpeed);
    }, true);
    region[0].addEventListener("mouseout", function() {
      region.animate(availableStyle(rand), animationSpeed);
    }, true);
    region.attr(availableStyle(rand));
    region.attr({href: name.replace(/\s+/g, '_').toLowerCase(), title: name});
  } else {
    region.attr(unavailableStyle());
    region.attr({title: name});
  }
};

var img = paper.image("./www/osm_bw.png", 0, 0, w, h);

for(var regionName in regions) {
  styleRegion(paper.path(regions[regionName]), regionName);
}