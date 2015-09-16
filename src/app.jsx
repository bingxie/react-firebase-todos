var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header')

var rootUrl = 'https://luminous-heat-9884.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire], // minxins把相应地对象的方法copy过来

  componentWillMount: function() {
    // bindAsObject是reactfire提供的方法
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },

  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header />
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
