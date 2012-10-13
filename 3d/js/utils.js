function getRegionNames() {
  names = []
  ids = $(".navRegionId");
  $.each($(".navRegionName"), function(index, value) { 
    names.push( [ $(ids[index]).val() ,$(value).val()] );
  });

return names;
}