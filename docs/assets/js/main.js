$(document).ready(function() {  
    $(window).on('load resize', function() {
        $(window).trigger('scroll'); 
    }); 
   
    /* Activate scrollspy menu */ 
    $('body').scrollspy({ target: '#doc-nav', offset: 100 });

    // Create navigation menu 
    $.getJSON("assets/data/menu.json", function (menu) {     
        const docMenu = createDocMenu(menu);
        $("#doc-menu").html(docMenu);
    });
 
    // Get default content   
     /*Click on navigation bar*/
    $("a").on("click", function (e) {
        alert("Click on navigation bar");
        handleHTML(e, this);
    });

    /*Clicl on links in Div_Content*/ 
    $("#div_content").on("click","a", function (e) {
        alert("Click on navigation bar #div_content");
        handleHTML(e, this);
    });
});

/*(function(){
   
})();*/
