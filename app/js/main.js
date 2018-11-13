let selection = [];

function selected(chkBox) { selection.push(chkBox.id); }

var xzhu = (function(md) {
  
  md.data = {
    photo_list: []
  };


  md.append_photo = function(arr) {

    // <div class="iso-box photoshop branding col-md-4 col-sm-6">
    //   <div class="portfolio-thumb">
    //      <input type="checkbox" id="cb1" />
    //      <label for="cb1"><img src="images/portfolio-img1.jpg" />
    //      </label>
    //   </div>
    // </div>
    let isobox_start = "<div class=\"iso-box photoshop branding col-md-4 col-sm-6\">";
    let thumb_start = "<div class=\"portfolio-thumb\">";
    let thumb_end = "</div>";
    let isobox_end = "</div>";

    $.each(arr, function(idx, val) {
      // let input = "<input type=\"checkbox\" name=\"hello\" id=\"cb" + val + "\" />";
      let input = "<input type=\"checkbox\" id=\"cb" + val + "\" onclick=\"if(this.checked){selected(this)}\" />";
      let label_start = "<label for=\"cb" + val + "\">";
      let img = "<img src=\"" + val + "\" />";
      let label_end = "</label>";

      $("#main-section").append(
        isobox_start + thumb_start + input + label_start + img + label_end + thumb_end + isobox_end
      );
    });

    $("#main-section").append(
      "<div class=\"iso-box photoshop branding col-md-12 col-sm-12\">" + thumb_start + "<a id=\"submit\" href=\"#\">Submit</a>" + thumb_end + isobox_end
    )
    // $("#main-section").append("<div id=\"floater\">FLOATING BUTTON</div>")
  }



  md.create_radar_chart = function() {

  };

  md.click_event = function() {
    $("#submit").click(function() {
      $("#main-section").empty();

      selection = Array.from(new Set(selection));
      if(typeof(Storage)!=="undefined")
      {
        window.localStorage.setItem("selection", JSON.stringify(selection));
      }
      else
      {
        console.log('error at sotrage at index');
      }

      window.location.replace("chart.html");
    });
  };

  md.init = function() {
    for (let i = 1, c = 60; i <= c; i++)
    {
      md.data.photo_list.push("images/" + i + ".jpg");
    }
    md.append_photo(md.data.photo_list);
    md.click_event();
  };

  return md;
})(xzhu || {});

$(window).scroll(function() {
    var winScrollTop = $(window).scrollTop();
    var winHeight = $(window).height();
    var floaterHeight = $('#floater').outerHeight(true);
    var fromBottom = 20;
    var top = winScrollTop + winHeight - floaterHeight - fromBottom;
  $('#floater').css({'top': top + 'px'});
});

$(document).ready(function(){
  xzhu.init();


});


