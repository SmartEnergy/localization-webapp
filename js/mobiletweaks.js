function onStartTweaks() {
    $("#pushUICheckbox").attr('checked', true);
    $('#navigation').css("width", "60px");  
    $('#navigation').css("height", "30px");  
    $("#navigationHead").html("Nav"); 
    $(".navleft").hide(); 
    
    $(".ui-accordion-header").removeClass("ui-corner-all");

    
}


function isMobile() {

    //return true; //TODO Raus
    return  (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i)) &&
            !navigator.userAgent.match(/Tablet/i) &&
            !navigator.userAgent.match(/Android 3./i)      
}
