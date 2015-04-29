function get_random_images() {
    var items = new Array();
    $.getJSON( "https://script.google.com/macros/s/AKfycbwFYj0LiqWIFM4m3q0W_WD9bw5fuOEZO3gxYFI0JRe1_JgLDo5w/exec", function( data ){
        for(var i=0;i<data.length; i++)
        {
            items[i] = data[i].image.url.split("/products/")[1];
        }   
        
    });
    return items;
}   
    
