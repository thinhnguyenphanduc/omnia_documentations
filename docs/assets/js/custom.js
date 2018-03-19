 function createDocMenu(documents) {  
    var docMenuNode = "<li><input id='documentations' placeholder='Search...' class='form-control'/></li>";
    var isActive = true;
    documents.forEach(function (doc) { 
        if (isActive) {
            docMenuNode += `<li class='active'> <a class='nav-level1' href='${doc.href}' data-documentation='${doc.slug}'>${
                doc.name}</a>`;
            isActive = false; 
        } else {
            docMenuNode += `<li> <a class='nav-level1' href='${doc.href}' data-documentation='${doc.slug}'>${doc.name}</a>`;
        }

        if (doc.subTitle.length > 0) {
            docMenuNode += "<ul class='nav doc-sub-menu'>";
            doc.subTitle.forEach(function (subDoc) {
                docMenuNode += `<li> <a class='nav-level2' href='${subDoc.href}' data-documentation='${subDoc.slug}'>${subDoc.name
                    }</a></li>`;
            });
            docMenuNode += "</ul>";
        }
        docMenuNode += "</li>";

    });
    return docMenuNode;
};

// Get html from url 
function getHTML(href, targetHref, data_documentation) {
    $("#div_content").load(href + data_documentation + targetHref,
         function (response, status) {             
             // Change src of img tags
             $('#div_content img').each(function () {
                 var url = $(this).attr('src');
                 // More than one ../
                 while (url.indexOf("../") >= 0) {
                     url = url.replace("../", "");
                 }

                 // Append complete url
                 url = href +
                     data_documentation +
                     "/Docs/" +
                     $('#language').val() +
                     "/" +
                     url;
                 $(this).attr('src', url);
             });
             $("#div_content").innerHTML = response;

             // Set data-documentation to every a tag
             $('#div_content a').each(function () {
                 $(this).attr('data-documentation', data_documentation);
             });
         });
 }

// Handle loading html to div tag
function handleHTML(e, pointer) {
    const targetHref = $(pointer).attr("href");
    var href = $(location).attr('href');
    // Clear id-based element movement
    const endPos = href.indexOf("/#");
    if (endPos > 0) {
        href = href.slice(0, (endPos + 1));
        // Clean current url
        
    }
    var data_documentation = $(pointer).attr("data-documentation");    
    // Load html to div tag
    if (targetHref.indexOf("#") < 0 && targetHref.indexOf("http") != 0) // In case, there is # or external url
    {
        e.preventDefault();
        getHTML(href, targetHref, data_documentation);
    }
}

// Navigation Status
function navigationStatus(menu, pointer){
    if($(pointer).hasClass("nav-level1"))
    {
     $("#active-doc").text($(pointer).text());
    } else if($(pointer).hasClass("nav-level2"))
    {
     var level1_el = $(pointer).parent().parent().parent().children().first().text();
     $("#active-doc").text(level1_el + " | " + $(pointer).text());
    }    
}
