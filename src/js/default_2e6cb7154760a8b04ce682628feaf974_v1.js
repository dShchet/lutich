
; /* Start:"a:4:{s:4:"full";s:93:"/bitrix/components/whatasoft/igkh.user.auth.register/templates/popup/script.js?16602556862989";s:6:"source";s:78:"/bitrix/components/whatasoft/igkh.user.auth.register/templates/popup/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){
  function FormAjaxInit(_form){
    var form = _form[0];
    
    if(_form.data('recaptcha')){
      recaptcha_block = $('.g-recaptcha', _form);
      if(grecaptcha.render !== undefined){
        grecaptcha.render(recaptcha_block.attr('id'));
      }
    }
    
    $('select', _form).each(function(){
      WhatasoftInitSelect($(this));
    });
    
    if(BX.UserConsent){
      BX.UserConsent.load(form);
    }
    
    _form.validate({
      errorPlacement: $.noop,
      highlight: function(element, errorClass, validClass){
        $(element).addClass(errorClass).removeClass(validClass);
        var error_block = $(element).closest('.validate_error_block');
        if(error_block.length){
          error_block.addClass(errorClass).removeClass(validClass);
          var error_block_elements = error_block.find('.validate_error_element');
          if(error_block_elements.length){
            error_block_elements.addClass(errorClass).removeClass(validClass);
          }
        }
      },
      unhighlight: function(element, errorClass, validClass){
        $(element).removeClass(errorClass).addClass(validClass);
        var error_block = $(element).closest('.validate_error_block');
        if(error_block.length){
          error_block.removeClass(errorClass).addClass(validClass);
          var error_block_elements = error_block.find('.validate_error_element');
          if(error_block_elements.length){
            error_block_elements.removeClass(errorClass).addClass(validClass);
          }
        }
      },
      ignore: [],
      rules:{
          'g-recaptcha-response': {required: true}
      },
      submitHandler: function(form){
        if(BX.UserConsent){
          BX.onCustomEvent('was_formbx_submit_consent_form_register', []);
          var control = BX.UserConsent.load(form);
          if(control){
            if(!control.inputNode.checked){
              return;
            }
          }
        }
        
        var form_block = $(form);
        ajax_id = form_block.data('ajax_id');
        form_data = form_block.serialize();
        whatasoft.ajax.addSpinner(form_block);
        
        whatasoft.ajax.send(ajax_id, form_data).then(function(response){
          new_form = form_block.html($('<div>'+response.data.data+'</div>').find('form').html());
          FormAjaxInit(new_form);
        }.bind(this)).catch(function(response){
          whatasoft.ajax.removeSpinner(form_block);
          WhatasoftShowMsg(response.message, BX.message('WAS_AJAX_JS_ERROR_TITLE'));
          console.log(response.message);
        });
      }
    });
  }

  if(window.frameCacheVars !== undefined){
    BX.addCustomEvent('onFrameDataReceived', function(json){ //after composit loaded all blocks
      FormAjaxInit($('.was_form_register'));
    });
  }else{
    $(document).ready(function(){
      FormAjaxInit($('.was_form_register'));
    });
  }
}());
/* End */
;
; /* Start:"a:4:{s:4:"full";s:91:"/bitrix/components/whatasoft/igkh.user.auth.forgot/templates/popup/script.js?16602556861915";s:6:"source";s:76:"/bitrix/components/whatasoft/igkh.user.auth.forgot/templates/popup/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){
  function FormAjaxInit(_form){
    var form = _form[0];
    
    if(_form.data('recaptcha')){
      recaptcha_block = $('.g-recaptcha', _form);
      if(grecaptcha.render !== undefined){
        grecaptcha.render(recaptcha_block.attr('id'));
      }
    }
    
    _form.validate({
        errorPlacement: $.noop,
        highlight: function(element, errorClass, validClass){
          $(element).addClass(errorClass).removeClass(validClass);
          $(element).closest('.g-recaptcha').addClass(errorClass);
        },
        unhighlight: function(element, errorClass, validClass){
          $(element).removeClass(errorClass).addClass(validClass);
          $(element).closest('.g-recaptcha').removeClass(errorClass);
        },
        ignore: [],
        rules:{
            'g-recaptcha-response': {required: true}
        },
        submitHandler: function(form){
          var form_block = $(form);
          
          ajax_id = form_block.data('ajax_id');
          form_data = form_block.serialize();
          whatasoft.ajax.addSpinner(form_block);
          
          whatasoft.ajax.send(ajax_id, form_data).then(function(response){
            new_form = form_block.html($('<div>'+response.data.data+'</div>').find('form').html());
            FormAjaxInit(new_form);
          }.bind(this)).catch(function(response){
            whatasoft.ajax.removeSpinner(form_block);
            WhatasoftShowMsg(response.message, BX.message('WAS_AJAX_JS_ERROR_TITLE'));
            console.log(response.message);
          });
        }
    });
  }

  if(window.frameCacheVars !== undefined){
    BX.addCustomEvent('onFrameDataReceived', function(json){ //after composit loaded all blocks
      FormAjaxInit($('.was_form_forgot'));
    });
  }else{
    $(document).ready(function(){
      FormAjaxInit($('.was_form_forgot'));
    });
  }
}());
/* End */
;
; /* Start:"a:4:{s:4:"full";s:109:"/bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/system.auth.form/popup/script.js?16602567061131";s:6:"source";s:94:"/bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/system.auth.form/popup/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){
  function FormAjaxInit(_form){
    var form = _form[0];
    
    _form.validate({
      errorPlacement: $.noop,
      submitHandler: function(form){
        var form_block = $(form);
        ajax_id = form_block.data('ajax_id');
        form_data = form_block.serialize();
        whatasoft.ajax.addSpinner(form_block);
        
        whatasoft.ajax.send(ajax_id, form_data).then(function(response){
          new_form = form_block.html($('<div>'+response.data.data+'</div>').find('form').html());
          FormAjaxInit(new_form);
        }.bind(this)).catch(function(response){
          whatasoft.ajax.removeSpinner(form_block);
          WhatasoftShowMsg(response.message, BX.message('WAS_AJAX_JS_ERROR_TITLE'));
          console.log(response.message);
        });
      }
    });
  }
  
  if(window.frameCacheVars !== undefined){
    BX.addCustomEvent("onFrameDataReceived", function(json){ //after composit loaded all blocks
      FormAjaxInit($(".was_form_auth"));
    });
  }else{
    $(document).ready(function(){
      FormAjaxInit($(".was_form_auth"));
    });
  }
}());
/* End */
;
; /* Start:"a:4:{s:4:"full";s:109:"/bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/socserv.auth.form/popup/script.js?1660256706646";s:6:"source";s:95:"/bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/socserv.auth.form/popup/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function BxSocServPopup(id){
  var content = BX("bx_socserv_form_"+id);
  if(content){
    var popup = BX.PopupWindowManager.create("socServPopup"+id, BX("bx_socserv_icon_"+id), {
      autoHide: true,
      closeByEsc: true,
      angle: {offset: 24},
      content: content,
      offsetTop: 3
    });

    popup.show();

    var input = BX.findChild(content, {'tag':'input', 'attribute':{'type':'text'}}, true);
    if(input){
      input.focus();
    }

    var button = BX.findChild(content, {'tag':'input', 'attribute':{'type':'submit'}}, true);
    if(button){
      button.className = 'btn btn-primary';
    }
  }
}
/* End */
;; /* /bitrix/components/whatasoft/igkh.user.auth.register/templates/popup/script.js?16602556862989*/
; /* /bitrix/components/whatasoft/igkh.user.auth.forgot/templates/popup/script.js?16602556861915*/
; /* /bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/system.auth.form/popup/script.js?16602567061131*/
; /* /bitrix/templates/whatasoft_igkh_default_s1/components/bitrix/socserv.auth.form/popup/script.js?1660256706646*/
