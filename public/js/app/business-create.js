function makeActive(){
  var site = $(this).data('site')
  var targetDiv = $("#tab-"+site)
  var targetDivConfig = $("#configure-"+site)
  var selectBoxTemplate = ""
  var appSelectDiv = ""
  var optionsList = ""

  if($(this).is(':checked')){
    targetDiv.show()
    targetDivConfig.show()
    $.get( "/social-media/filter/site/"+site )
    .done(function( data ) {
      if(data.length >= 1){
        data.forEach(result => {
          optionsList += `
            <option value="${result.id}">${result.appname}</option>`
         });
         selectBoxTemplate +=`
            <select class="form-control" onchange="onChooseApp.call(this)" id="app-select-${site}">
              <option value="">Choose One App</option>
              ${optionsList}
            </select>`

          appSelectDiv +=`
            <div class="aside-options">
                <div class="clearfix mt-4">
                  <label for="select-app">Apps</label>
                  <div class="form-group">
                        ${selectBoxTemplate}
                    </div>
                </div>
            </div><br>`         
      }else{
        appSelectDiv +=`
          <div class="aside-options">
              <div class="clearfix mt-4">
                <i>There is no App</p>
              </div>
          </div>`
      }
      targetDiv.html(appSelectDiv)
    });
  }else{
    targetDiv.hide()
    targetDivConfig.hide()
  }
  
}


function onChooseApp(){
  var app = $(this).val()
  var maintemplate = ""
  var inputsCom = ""
  if(app !== ''){
    $.get( "/social-media/filter/app/"+app )
    .done(function( data ) {
      var tragetDivId = data[0].site
      data[0].searchOn.forEach(r => {
        if(r.val == 'on'){
          var name = r.name.replace("_", " ").toUpperCase();
          inputsCom +=`
            <div class="aside-options">
              <div class="clearfix mt-4">
                <small>
                  <b>${name}</b>
                </small>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <select multiple="multiple" 
                    class="form-control sl2-custom-inp" 
                    id="${tragetDivId}_${r.name}"  
                    name="${tragetDivId}_${r.name}" >
                </select>
              </div>
            </div> `
        }
      });
      maintemplate +=`
        <hr>
        <h6>Configuration</h6>
        ${inputsCom}
      `
      $("#configure-"+tragetDivId).html(maintemplate)
      $(".sl2-custom-inp").select2({
          tags: true,
          tokenSeparators: [',', ' ']
      })
    })
  }
}

(function(config){
 var socialMediaAppDiv = $("#social-media-app-config")
 var asideDiv = $("#aside")
 asideDiv.css("margin-right", "-500px");
 $("#save_and_trigger").hide();
 var navliTemplate = ""
 for (var key in config) {
    navliTemplate += `
        <li class="nav-item">
          <a class="nav-link " data-toggle="tab" href="#${key}" role="tab">
            <i class="icon-social-${key}"></i>
          </a>
        </li>`
  }
  var tabContent = ""
  for (var key in config) {
    tabContent += `
        <div class="tab-pane p-3 " id="${key}" role="tabpanel">
          <h6>${config[key].name}</h6>
          <div class="aside-options">
            <div class="clearfix mt-4">
              <small>
                <b>Add ${config[key].name}</b>
              </small>
              <label class="switch switch-3d switch-primary float-right">
                  <input id="activator_${key}" class="switch-input" onchange="makeActive.call(this)" type="checkbox" data-site="${key}"  >
                  <span class="switch-slider"></span>
              </label>
            </div>
          </div>
          <hr>
          <div id="tab-${key}"> </div>
          <div id="configure-${key}"> </div>
        </div>
    `
  }

  var TabsTemplate = `
    <ul class="nav nav-tabs" role="tablist">
      ${navliTemplate}
    </ul>
    <div class="tab-content">
      ${tabContent}
    </div>
  ` 
  asideDiv.html(TabsTemplate)

  // On click next btn
  $("#config_card_load").click(function(){
      asideDiv.css("margin-right", "0px");
      $("#save_and_trigger").show();
      $('.nav-tabs a[href="#twitter"]').tab('show');
  })

  $("#save_and_trigger_btn").click(function(e){
    e.preventDefault()
    var businessName = $("input[name=bname]").val();
    var industryName = $("input[name=industryname]").val();
    var bdesc =  $("textarea[name=bdesc]").val();
    var baddress = $("input[name=baddress]").val();
    var badmin = $("input[name=badmin]").val();
    var badminemail = $("input[name=badminemail]").val();
    var socialMedia = []
    for (var key in config) {
      var temp = {}
      var checkPoint = $("#activator_"+key).is(':checked')
      if(checkPoint){        
        var appId = $("#app-select-"+key).val() 
        for (var k in  config[key].searchon) {
          Object.assign(temp,{
            [k]: $(`#${key}_${k}`).val()
          })
        }
        Object.assign(temp,{
          appId: appId
        })
      }
      socialMedia.push({
        [key]: temp
      })
    }
    var params = {
      businessName,
      industryName,
      bdesc,
      baddress,
      badmin,
      badminemail,
      socialMedia:JSON.stringify(socialMedia)
    }
    $.post("/business/create/",params)
    .done(function( data ) {
      window.location = "/";
    });

  })


})(config);



