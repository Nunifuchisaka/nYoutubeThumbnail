window.nYoutube = Backbone.View.extend({
  
  initialize: function( opts ) {
    _.bindAll(this, 'onYouTubeIframeAPIReady', 'onStateChange');
    this.opts = _.extend({
      width: 640,
      height: 390
    }, opts);
    
    this.player;
    this.play_once = false;
    
    this.on('start', this.onYouTubeIframeAPIReady);
  },
  
  onYouTubeIframeAPIReady: function() {
    var self = this;
    var id = this.$el.attr('id');
    this.player = new YT.Player(id + "__player", {
      width: this.opts.width,
      height: this.opts.height,
      videoId: this.opts.videoID,
      events: {
        'onStateChange': this.onStateChange
      },
      playerVars: {
        rel: 0,
        showinfo: 0,
        wmode: "transparent"
      }
    });
    
    this.$el.append( $('<div class="n_video_1__poster"><img src="' + this.opts.poster + '" /></div>') );
    this.$poster = this.$el.find(".n_video_1__poster");
    this.$poster.click(function(){
      self.$poster.remove();
      console.log("再生");
      self.player.playVideo();
      //self.iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    });
  },
  
  onStateChange: function(e) {
    var status = e.data;
    if( status == YT.PlayerState.BUFFERING && !this.play_once ) {
      this.$poster.remove();
      this.play_once = true;
    }
  }
  
});


//
/*
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
*/


/*
## functions
*/




/*
## nYoutubeThumbnail
*/

/*
function nYoutubeThumbnail(opts){
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

nYoutubeThumbnail.prototype = {
  
  start: function(){
    
  }
  
}
*/
