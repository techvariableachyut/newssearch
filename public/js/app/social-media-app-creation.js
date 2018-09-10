(function(config){
  var asideDiv = $("#aside")
  asideDiv.css("margin-right", "-500px");
  var settingsDiv = $('#settings')
  var socialMediaSiteOption = $('#smsite')
  var socialMediaSite = socialMediaSiteOption.val()
  var errorDiv = $("#error-div")
  var createAppBtn = $("#create-app-btn")
  function chnageSidePanel(){
    var template = "";
    var socialMediaSite = socialMediaSiteOption.val()
    if(socialMediaSite !== ''){
      errorDiv.hide()
      asideDiv.css("margin-right", "0px");
      settingsDiv.html(`
        <div id="loader-insite-aside" class="loader-insite-aside" >Loading......</div>
      `)
      if(config.hasOwnProperty(socialMediaSite)){
        var siteConfigs = config[socialMediaSite]
        template += `
          <div class="aside-options">
            <div class="clearfix mt-4">
              <small>
                <b>${siteConfigs.name}</b>
              </small>
            </div>
          </div>
          <hr>
          <h6>Configuration</h6>
          <br>
        `;
        for (var key in siteConfigs.keys) {
            if (siteConfigs.keys.hasOwnProperty(key)) {
              template += `
              <div class="form-group row">
                    <div class="col-md-3">
                        ${siteConfigs.keys[key]}
                    </div>
                    <div class="col-md-7">
                        <input required  name="${key}" id="${key}" class="form-control" type="text" placeholder="${siteConfigs.keys[key]}"> 
                      </div>
                </div>`
            }
        }
        template += `         
        <hr>
        <h6>Get Data from</h6>
        <br>`
        for (var key in siteConfigs.searchon) {
            if (siteConfigs.searchon.hasOwnProperty(key)) {
              template += `
              <div class="form-group row">
                    <div class="col-md-3">
                        ${siteConfigs.searchon[key]}
                    </div>
                    <div class="col-md-7">
                        <input name="${key}" id="${key}" class="form-control" type="checkbox" > 
                     </div>
                </div>
              `
            }
        } 
        settingsDiv.html(template)
      }else{
        asideDiv.css("margin-right", "-500px");
        errorDiv.show()
      }
    }else{
      errorDiv.show()
    }
  
  }

  socialMediaSiteOption.change(function() {
    chnageSidePanel()
  });

  // On create btn 
  createAppBtn.click(function(e){
    e.preventDefault()
    $('.main').append('<div class="loader"> </div>')
    var app = socialMediaSiteOption.val()
    var appname = $("#appname").val()
    var appdesc = $("#appdesc").val()
    var siteConfigs = config[app]
    var configs = []
    for (var key in siteConfigs.keys) {
        var obj = {
          name: $(`#${key}`).attr("name"),
          val: $(`#${key}`).val()
        }
        configs.push(obj)
    }
    var searchOn= []
    for (var key in siteConfigs.searchon) {
        var obj = {
          name: $(`#${key}`).attr("name"),
          val: $(`#${key}`).is(':checked') ? 'on' : 'off'
        }
        searchOn.push(obj)
    }
    
    $.post( "/social-media/app/create",{
      app,
      appname,
      appdesc ,
      configs: JSON.stringify(configs),
      searchOn: JSON.stringify(searchOn)
    })
    .done(function( data ) {
      window.location = "/social-media/app/";
    });
    
  }) 
  // On create btn 




})(config);