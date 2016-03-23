import LtiApp from 'appkit/libs/lti-app';
import ajax from 'appkit/utils/ajax';

var LtiAppRoute = Ember.Route.extend({
  model: function(params) {
    return LtiApp.findOne(params.toolId);
  },

  setupController: function(controller, context) {
    controller.set('model', context);
  },

  afterModel: function(model) {
    if (model.get('toolType') === 'browse') {
      this.transitionTo('ltiApp.browse');
    } else {
      this.transitionTo('ltiApp.search');
    }
  },

  actions: {
    embedItem: function(returnType) {
      var _this = this;
      var url = Ember.ENV.CONFIG.host + '/api/embed';
      var postData = {
        return_type: returnType.getJson(),
        launch_params: Em.ENV.LAUNCH_PARAMS
      };
      /* globals ga: false */
      ga('send', 'event', 'Memes', 'embed', returnType.url);


      ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        data: postData
      }).then(
        function(data) {


          if (data.hasOwnProperty('redirectUrl')) {
            window.location.replace(data.redirectUrl);
          } else {
            _this.get('controller').triggerModal(returnType);
          }
        },
        function(err) {
          Em.debug('Error: + ', err);
        }
      );
    }
  }
});

export default LtiAppRoute;
