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
        
        // Click on navigation bar
        $("a").on("click", function (e) {
            handleHTML(e, this);
        });

        // Click on links in Div_Content
        $("#div_content").on("click","a", function (e) {
            handleHTML(e, this);
        });

        // Load default content       
        getHTML($(location).attr('href'), menu[0].href, menu[0].slug); 
        
        // Search event
        var options = {
            data: menu,

            getValue: "name",

            template: {
                type: "description",
                fields: {
                    description: "slug"
                }
            },
            list: {
                onSelectItemEvent: function() {
                    var href = $("#function-data").getSelectedItemData().href;
                    var slug = $("#function-data").getSelectedItemData().slug;
			        $("#data-holder").val(value).trigger("change");
                    console.log(href);
                    console.log(slug);
                    getHTML($(location).attr('href'), href, slug);                     
                }	
            }
        };

        $("#documentations").easyAutocomplete(options);        
    });
});
