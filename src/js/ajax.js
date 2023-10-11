window.whatasoft = window.whatasoft || {};

whatasoft.ajax = {};
whatasoft.ajax.send = function(_ajax_id, _data, _params){
  return new Promise(function(resolve, reject){
    _params = typeof _params !== 'undefined' ? _params : {};
    
    var post_data = {};
    var params = {};
    var errors = [];
    
    var session_id = BX.bitrix_sessid();
    
    if(_data instanceof FormData){
      _data.append('ajax_id', _ajax_id);
      params = {
        contentType: false,
        processData: false
      };
      post_data = _data;
    }else if(typeof _data == 'string'){
      post_data = _data + '&ajax_id='+ _ajax_id;
    }else if(typeof _data == 'object'){
      var additional = {
        ajax_id: _ajax_id
      };
      post_data = $.extend({}, _data, additional);
      if(_params.json){
        params = {
          contentType: 'application/json; charset=utf-8',
          processData: false
        };
        post_data = JSON.stringify(post_data);
      }
    }else{
      var response = {
        xhr: null,
        status: null,
        data: null,
        message: 'Wrong request data type'
      }
      reject(response);
    }
    
    var defaults = {
      url: '/bitrix/tools/whatasoft.igkh/ajax.php',
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: post_data
    };
    var settings = $.extend({}, defaults, params, _params);
    
    if(typeof settings.headers == 'object'){
      settings.headers['X-Bitrix-Csrf-Token'] = session_id;
    }else{
      settings.headers = {
        'X-Bitrix-Csrf-Token': session_id
      };
    }
    
    var request = $.ajax(settings);
    request.done(function(data, textStatus, jqXHR){
      BX.message['bitrix_sessid'] = data.session_id;
      
      var response = {
        xhr: jqXHR,
        status: jqXHR.status,
        data: data
      }
      
      resolve(response);
    });
    
    request.fail(function(jqXHR, textStatus, errorThrown){
      var response = {
        xhr: jqXHR,
        status: jqXHR.status,
        data: jqXHR.responseJSON,
        message: ''
      }
      
      if(!jqXHR.responseJSON){
        response.message = 'Request failed: ' + textStatus;
      }else{
        BX.message['bitrix_sessid'] = response.data.session_id;
        response.message = response.data.message;
      }
      
      reject(response);
    });
  });
};

whatasoft.ajax.addSpinner = function(_block){
  if($('.was_spinner_cont',_block).length > 0){
    return;
  }
  spinner = $('<div class="was_spinner_cont"><div class="spinner"></div></div>');
  if(_block.css('position') != 'absolute' && _block.css('position') != 'fixed'){
    _block.css('position', 'relative');
  }
  _block.append(spinner);
}

whatasoft.ajax.removeSpinner = function(_block){
  _block.find('.was_spinner_cont').remove();
}