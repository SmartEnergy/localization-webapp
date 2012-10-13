/*
 * @author: Tobias Hartwich (tha@tzi.de)
 */

(function($){
    $.fn.extend({ 
        switchButton: function(options) {
            var self = this;
            
            var defaults = {
                onClick: undefined
            }
                 
            var options =  $.extend(defaults, options);
            
            this.each(function() {
              if ($(this).hasClass('switchButtons')) {
                $('.navConnectedButtonsAButton', this).click(function(event) {
                  $('.navConnectedButtonsAButton', self).removeClass("navConnectedButtonsAButtonActive");
                  $(this).addClass("navConnectedButtonsAButtonActive");
                });
              }
              
              $('.navConnectedButtonsAButton', this).click(function(event) {
                if (options.onClick !== undefined) {
                  var title = $(this).attr("title");
                  if (typeof title !== 'undefined' && title !== false) {
                      options.onClick($(this).attr("title"));
                  }
                  else {
                    options.onClick($(this).text());
                  }
                  
                }                  
                
              }); 
                
              
              $('.navConnectedButtonsAButton', this).mousedown(function(event) {
                $(this).addClass("navConnectedButtonsAButtonClicked");
              });   
              $('.navConnectedButtonsAButton', this).mouseup(function(event) {
                $(this).removeClass("navConnectedButtonsAButtonClicked");
              });    
            })            
            
                    
            /*this.keydown(function(e) {
              // Navigate Back
              if (e.keyCode === 8) {
                if ($(this).val() === "") {
                  var inpIdx = self.index(this);
                  if (inpIdx > 0) {
                    var newidx = inpIdx-1;
                    // Vorvorheriges wenns deaktiviert ist
                    while ($(self[newidx]).attr("disabled") === "disabled") {
                      newidx--;
                    }
                    $(self[newidx]).focus();
                    
                  }
                }
              }
            });*/
            
            return this;
        }
    });
})(jQuery);