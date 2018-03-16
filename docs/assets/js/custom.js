 function createDocMenu(documents) { 
    var docMenuNode = "<li><input id='countries' placeholder='Search...' class='form-control'/></li>";
    var isActive = true;
    documents.forEach(function (doc) {
        if (isActive) {
            docMenuNode += `<li class='active'> <a href='${doc.href}' data-documentation='${doc.slug}'>${
                doc.name}</a>`;
            isActive = false; 
        } else {
            docMenuNode += `<li> <a href='${doc.href}' data-documentation='${doc.slug}'>${doc.name}</a>`;
        }

        if (doc.subTitle.length > 0) {
            docMenuNode += "<ul class='nav doc-sub-menu'>";
            doc.subTitle.forEach(function (subDoc) {
                docMenuNode += `<li> <a href='${subDoc.href}' data-documentation='${subDoc.slug}'>${subDoc.name
                    }</a></li>`;
            });
            docMenuNode += "</ul>";
        }
        docMenuNode += "</li>";

    });
    return docMenuNode;
};

// Handle loading html to div tag
function handleHTML(e, pointer) {
    const targetHref = $(pointer).attr("href");
    var href = $(location).attr('href');
    // Clear id-based element movement
    const endPos = href.indexOf("/#");
    if (endPos > 0) {
        href = href.slice(0, (endPos + 1));
    }

    console.log(`data: ${$(pointer).attr("data-documentation")}`);
    console.log(`language: ${$('#language').val()}`);

    // Load html to div tag
    if (targetHref.indexOf("#") < 0 && targetHref.indexOf("http") != 0) // In case, there is # or external url
    {
        e.preventDefault();
        console.log("preventDefault");
        $('#div_content').load(href + $(pointer).attr("data-documentation") + targetHref,
            function (response, status) {
                console.log("loadDivContent");
                // Change src of img tags
                $('#div_content img').each(function () {
                    var url = $(this).attr('src');
                    // More than one ../
                    while (url.indexOf("../") >= 0) {
                        url = url.replace("../", "");
                    }

                    // Append complete url
                    url = href +
                        $(pointer).attr("data-documentation") +
                        "/Docs/" +
                        $('#language').val() +
                        "/" +
                        url;
                    $(this).attr('src', url);
                });
                $('#div_content').innerHTML = response;

                // Set data-documentation to every a tag
                $('#div_content a').each(function () {
                    $(this).attr('data-documentation', $(pointer).attr("data-documentation"));
                });
            });
    }
}
