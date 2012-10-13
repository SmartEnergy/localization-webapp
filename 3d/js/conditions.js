var CONDITIONS = [
  
new ConditionAction({
name: "userIn",
type: "condition",
displayName: "User entered a region",
category: "Regions",
icon: "../../img/conditionicons/userenter_icon.png",
options: [ 
           {
              name: "region",
              type: "checkbox",                            
              getValuesFrom: "regionNames",
              value: ""  
           }
         ]     
}),

new ConditionAction({
name: "userOut",
type: "condition",
displayName: "User leaved a region",
category: "Regions",
icon: "../../img/conditionicons/userout_icon.png",
options: [ 
           {
              name: "region",
              type: "checkbox",                            
              getValuesFrom: "regionNames",
              value: ""   
           }
         ]        
}),

new ConditionAction({
name: "userAlreadyIn",
type: "condition",
displayName: "User moved in a region",
category: "Regions",
icon: "../../img/conditionicons/userin_icon.png",
options: [ 
           {
              name: "region",
              type: "checkbox",                            
              getValuesFrom: "regionNames",
              value: ""   
           }
         ]        
}),

new ConditionAction({
name: "Swipe-Down;",
type: "condition",
displayName: "User swipe down",
category: "Gestures",
icon: "../../img/conditionicons/gesture_swipedown.png",
options: [ 
         ]        
}),   

new ConditionAction({
name: "Swipe-Up;",
type: "condition",
displayName: "User swipe up",
category: "Gestures",
icon: "../../img/conditionicons/gesture_swipeup.png",
options: [ 
         ]        
}), 

new ConditionAction({
name: "Swipe-Right;",
type: "condition",
displayName: "User swipe right",
category: "Gestures",
icon: "../../img/conditionicons/gesture_swiperight.png",
options: [ 
         ]        
}),  

new ConditionAction({
name: "Swipe-Left;",
type: "condition",
displayName: "User swipe left",
category: "Gestures",
icon: "../../img/conditionicons/gesture_swipeleft.png",
options: [ 
         ]        
}), 


new ConditionAction({
name: "Wave;",
type: "condition",
displayName: "User made a wave gesture",
category: "Gestures",
icon: "../../img/conditionicons/gesture_wave_icon.png",
options: [ 
         ]        
}),
    
new ConditionAction({
name: "Click;",
type: "condition",
displayName: "User made a click gesture",
category: "Gestures",
icon: "../../img/conditionicons/gesture_click_icon.png",
options: [ 
         ]        
}),
    
new ConditionAction({
name: "Combi",
type: "condition",
displayName: "Gesture Combination",
category: "Gestures",
icon: "../../img/conditionicons/gesture_combi.png",
options: [ 
           {
              name: "Combi",
              type: "gestureCombi",                            
              value: ""  
           }
         ]        
})  
  
]