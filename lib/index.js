'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.removeElementReconfirm = removeElementReconfirm;
exports.confirmAlert = confirmAlert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var ReactConfirmAlert = (function (_Component) {
  _inherits(ReactConfirmAlert, _Component);

  function ReactConfirmAlert() {
    var _this = this;

    _classCallCheck(this, ReactConfirmAlert);

    _Component.apply(this, arguments);

    this.onClickConfirm = function () {
      _this.props.onConfirm();
      _this.close();
    };

    this.onClickCancel = function () {
      _this.props.onCancel();
      _this.close();
    };

    this.close = function () {
      removeElementReconfirm();
      removeSVGBlurReconfirm();
    };
  }

  ReactConfirmAlert.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var message = _props.message;
    var confirmLabel = _props.confirmLabel;
    var cancelLabel = _props.cancelLabel;
    var childrenElement = _props.childrenElement;
    var belowButtons = _props.belowButtons;

    return _react2['default'].createElement(
      'div',
      { className: 'react-confirm-alert-overlay' },
      _react2['default'].createElement(
        'div',
        { className: 'react-confirm-alert' },
        title && _react2['default'].createElement(
          'h1',
          null,
          title
        ),
        message && _react2['default'].createElement(
          'h3',
          null,
          message
        ),
        childrenElement(),
        _react2['default'].createElement(
          'div',
          { className: 'react-confirm-alert-button-group' },
          cancelLabel && _react2['default'].createElement(
            'button',
            { onClick: this.onClickCancel },
            cancelLabel
          ),
          confirmLabel && _react2['default'].createElement(
            'button',
            { onClick: this.onClickConfirm },
            confirmLabel
          )
        ),
        belowButtons()
      )
    );
  };

  _createClass(ReactConfirmAlert, null, [{
    key: 'propTypes',
    value: {
      title: _propTypes2['default'].string,
      message: _propTypes2['default'].string,
      confirmLabel: _propTypes2['default'].string,
      cancelLabel: _propTypes2['default'].string,
      onConfirm: _propTypes2['default'].func,
      onCancel: _propTypes2['default'].func,
      children: _propTypes2['default'].node
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      title: false,
      message: false,
      childrenElement: function childrenElement() {
        return null;
      },
      belowButtons: function belowButtons() {
        return null;
      },
      confirmLabel: false,
      cancelLabel: false,
      onConfirm: function onConfirm() {
        return null;
      },
      onCancel: function onCancel() {
        return null;
      }
    },
    enumerable: true
  }]);

  return ReactConfirmAlert;
})(_react.Component);

exports['default'] = ReactConfirmAlert;

function createSVGBlurReconfirm() {
  var svgNS = 'http://www.w3.org/2000/svg';
  var feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '0.7');

  var filter = document.createElementNS(svgNS, 'filter');
  filter.setAttribute('id', 'gaussian-blur');
  filter.appendChild(feGaussianBlur);

  var svgElem = document.createElementNS(svgNS, 'svg');
  svgElem.setAttribute('id', 'react-confirm-alert-firm-svg');
  svgElem.setAttribute('class', 'react-confirm-alert-svg');
  svgElem.appendChild(filter);

  document.body.appendChild(svgElem);
}

function removeSVGBlurReconfirm() {
  var svg = document.getElementById('react-confirm-alert-firm-svg');
  svg.parentNode.removeChild(svg);
  document.body.children[0].classList.remove('react-confirm-alert-blur');
}

function createElementReconfirm(properties) {
  document.body.children[0].classList.add('react-confirm-alert-blur');
  var divTarget = document.createElement('div');
  divTarget.id = 'react-confirm-alert';
  document.body.appendChild(divTarget);
  _reactDom.render(_react2['default'].createElement(ReactConfirmAlert, properties), divTarget);
}

function removeElementReconfirm() {
  var target = document.getElementById('react-confirm-alert');
  _reactDom.unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
}

function confirmAlert(properties) {
  createSVGBlurReconfirm();
  createElementReconfirm(properties);
}