//
$.fn.nYoutubeThumbnail = function( opts ){
  var self = this;
  
  return this.each(function(i, el){
    var opts = $.extend({
      i: i,
      el: el
    }, opts);
    new nYoutubeThumbnail(opts);
  });
}


/*
## functions
*/




/*
## nYoutubeThumbnail
*/

function nYoutubeThumbnail( opts ) {
  var self = this;
  this.opts = $.extend({
    
  }, opts);
  
  this.$el = $(this.opts.el);
  this.iframe = this.$el.find("iframe")[0].contentWindow;
  this.poster = this.$el.attr("data-poster");
  this.$el.append( $('<div class="n_video_1__poster"><img src="' + this.poster + '" /></div>') );
  this.$poster = this.$el.find(".n_video_1__poster");
  this.$poster.click(function(){
    self.$poster.remove();
    self.iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  });
}
