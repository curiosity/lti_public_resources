var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('ltiApps', { path: '/' });
  this.resource('ltiApp', { path: '/:toolId' }, function () {
    this.resource('ltiApp.browse', { path: '/browse/:folderChain' });
    this.resource('ltiApp.browseDetails', { path: '/browse/:folderChain/:item' });
    this.resource('ltiApp.search', { path: '/search' }, function () {
      this.route('results', { path: '/results/:searchText' });
      this.resource('ltiApp.search.details', { path: '/details/:id' }, function () {
        this.route('embed', { path: '/embed/:returnType' });
      });
    });
  });
  
  this.route('helper-test');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    /* globals ga: false */
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default Router;
