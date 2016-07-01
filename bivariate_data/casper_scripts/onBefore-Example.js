module.exports = function(casper, scenario, vp) {
  casper.echo('onBefore-Example.js', 'INFO');
  casper.wait(50);
};
