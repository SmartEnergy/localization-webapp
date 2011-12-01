function onStartTweaks() {
    
    $('#navigation').css("width", "60px");  
    $('#navigation').css("height", "30px");  
    $("#navigationHead").html("Nav"); 
    
    $(".ui-accordion-header").removeClass("ui-corner-all");
    $("#pushUICheckbox").attr('checked', true);
    $("#showDeviceCheckbox").attr('checked', false);  
    sceneview.showHideDevices(); 
}


function isMobile() {

    if (mobileVersion) {
      return true;
    }


    return  (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i)) &&
            !navigator.userAgent.match(/Tablet/i) &&
            !navigator.userAgent.match(/Android 3./i)      
}
