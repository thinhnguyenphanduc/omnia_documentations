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
        
	// Load default content
        getHTML($(location).attr('href'), urlLanguageBasedOnChange(menu[0].href), menu[0].slug); 
	    
        // Click on navigation bar
        $("#doc-menu a").on("click", function (e) {	
	    e.preventDefault();
	    navigationStatus(menu, this);
	    // Languge Based-On	    	    	    
            getHTML($(location).attr('href'), urlLanguageBasedOnChange($(this).attr("href")), $(this).attr("data-documentation"));
        });

        // Click on links in Div_Content
        $("#div_content").on("click","a", function (e) {
            handleHTML(e, this);
        });

	// Active event on Nav
	$('.nav li').click(function(e) {
	    $('.nav li').removeClass('active');
	    var $this = $(this);
	    if (!$this.hasClass('active')) {
	        $this.addClass('active');
	    }		
    	});

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
	        match: {
			enabled: true
		},
                onClickEvent: function() {
		    var name = $("#documentations").getSelectedItemData().name;
                    var href = $("#documentations").getSelectedItemData().href;
                    var slug = $("#documentations").getSelectedItemData().slug;		        
                    
                    getHTML($(location).attr('href'), href, slug);                     
                }	
            }
        };
        $("#documentations").easyAutocomplete(options);      
    });

});
