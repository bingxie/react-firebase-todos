var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header')
var List = require('./list');

var rootUrl = 'https://luminous-heat-9884.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire], // minxins把相应地对象的方法copy过来

  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },

  componentWillMount: function() {
    var fb = new Firebase(rootUrl + 'items/');

    // bindAsObject是reactfire提供的方法
    // 参数items就是把请求firebase返回的对象，赋值到state的items属性
    this.bindAsObject(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },

  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <hr />
        <div className={"content " + (this.state.loaded?'loaded':'')}>
          <List items={this.state.items} />
        </div>
      </div>
    </div>
  },

  handleDataLoaded: function(){
    console.log('loaded');
    console.log(this.state.items);
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
