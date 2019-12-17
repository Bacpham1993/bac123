function _settings(){
    var t = {};
    
    t.autoSettings = document.getElementsByTagName("body")[0].getBoundingClientRect();
    t.width = t.autoSettings.width;
    t.height = t.autoSettings.height;
    
    return t;
}