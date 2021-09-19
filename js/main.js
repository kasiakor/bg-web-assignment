window.addEventListener('load', function() {
    const myRequest = new Request('/data/properties.json');

    fetch(myRequest)
        .then(response => response.json())
        .then(data => {

            data.forEach(function(element) {
                renderProperty(element);
            })
        });
    //TODO: add catch
});


function renderProperty(property) {

    var propId = property["id"];
    var propImg = property["imageName"];
    var propImgAlt = property["imageAlt"];
    var propTitle = property["title"];
    var propRegion = property["region"];
    var propViewers = property["peopleViewing"];
    var propShortDescription = property["shortDescription"];
    var propCancellation = property["cancellationPolicy"];
    var propPrice = property["price"];
    var propRating = property["rating"];


    //drawer  
    var propLongDescription = property["longDescription"];
    var propAmenities = property["amenities"];
    var propAvailability = property["availability"];


    var propertyTemplate = createPropertyTemplate(propId, propImg, propImgAlt, propTitle, propRegion, propViewers, propShortDescription, propCancellation, propPrice, propRating);
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = propertyTemplate;
    document.getElementById("properties-wrapper").appendChild(htmlObject);

    var drawerTemplate = createPropertyDrawer(propId, propImg, propImgAlt, propTitle, propRegion, propPrice, propRating, propLongDescription, propAmenities, propAvailability);
    var htmlObject2 = document.createElement('div');
    htmlObject2.innerHTML = drawerTemplate;
    document.getElementById("properties-drawer").appendChild(htmlObject2);
}


function createPropertyTemplate(id, imageName, imageAlt, title, region, peopleViewing, shortDescription, cancellationPolicy, price, rating) {

    return `<div class="featured-info" >
        <img id="sm-prop-id-${id}" class="featured-img img-sm" src="images/${imageName}-w200.jpg" alt="${imageAlt}" />
        <img id="md-prop-id-${id}" class="featured-img img-md" src="images/${imageName}-w400.jpg" alt="${imageAlt}"/>
        <p class="viewers"><i>${peopleViewing} people checking it now</i></p>
        <h4>${title} - ${region} Region</h4>
        <p>${shortDescription}</p>
        <p>Cancellation Policy: ${cancellationPolicy}</p>
        <h4><b>&#128;</b>${price}</h4>
        ${createRatingTemplate(rating)}
    </div>`
}

function createRatingTemplate(rating) {
    var maxStars = 5;
    var stars = "";
    var diff = maxStars - rating;

    for (var index = 0; index < rating; index++)
        stars += '<span class="fa fa-star checked"/>';

    for (var index = 0; index < diff; index++)
        stars += '<span class="fa fa-star unchecked"/>';

    return `<p>${stars}</p>`;
}


function createPropertyDrawer(id, imageName, imageAlt, title, region, price, rating, longDescription, amenities, availability) {
    var disabledYear = function(year, availability) {
        if (!availability.includes(year)) {
            return 'disabled=""';
        }
        return "";
    }
    return `<div id="drawer-prop-id-${id}" class="container-drawer">
            <div class="content-wrapper">
                <div class="featured-info drawer">
                    <img class="featured-img img-lg" src="images/${imageName}-w800.jpg" alt="${imageAlt}" />
                    <div class="title-wrapper">
                        <h4>${title} - ${region} Region</h4>
                        <button type="button" class="btn price-btn"><b>&#128;</b>${price}</button>
                    </div>
                    ${createRatingTemplate(rating)}
                    <p>${longDescription}</p>
                    <p class="prop-amenities"><span>Amenities: </span>${amenities}</p>
                    <div id="btn-year1">
                        <button type="button" ${disabledYear(2081, availability)} class="btn year-btn">2081</button>
                        <button type="button" ${disabledYear(2082, availability)}  class="btn year-btn">2082</button>
                        <button type="button" ${disabledYear(2083, availability)}  class="btn year-btn">2083</button>
                        <button type="button" ${disabledYear(2084, availability)}  class="btn year-btn">2084</button>
                    </div>
                    <div id="btn-year2">
                        <button type="button" ${disabledYear(2085, availability)} class="btn year-btn">2085</button>
                        <button type="button" ${disabledYear(2086, availability)} class="btn year-btn">2086</button>
                        <button type="button" ${disabledYear(2087, availability)} class="btn year-btn">2087</button>
                        <button type="button" ${disabledYear(2088, availability)} class="btn year-btn">2088</button>
                    </div>
                    <button type="button" class="btn book-btn">Book</button>	
                </div>
            </div>
        </div>`
}

//handle drawer animation
var propertiesInterval = setInterval(function() {
    if ($("#properties-wrapper .featured-img").length > 0) {
        $("#properties-wrapper .featured-img").hover(function() {
            $(".container-drawer").each(function() {
                $(this).css("display", "none");
            })
            var propId = $(this).attr('id').substring(3);
            $(`#drawer-${propId}`).css("display", "block");
            setTimeout(function() {
                $("#properties-drawer")[0].style.right = '0';
            }, 0);
            $("button.btn.year-btn").click(function() {
                $(this).toggleClass("booked");
            });
        });
        clearInterval(propertiesInterval);
    }
}, 10);

var drawerInterval = setInterval(function() {
    if ($("#properties-drawer .container-drawer").length > 0) {
        $("button.btn.year-btn").click(function() {
            $(this).toggleClass("booked");
        });

        var drawerElement = document.getElementById("properties-drawer");
        document.addEventListener("click", function(event) {
            var isClickInside = drawerElement.contains(event.target);
            var drawerShown = $("#properties-drawer")[0].style.right[0] === "0";
            if (!isClickInside && drawerShown) {
                $("#properties-drawer")[0].style.right = '-500px';
            }
        });
        clearInterval(drawerInterval);
    }
}, 10);
