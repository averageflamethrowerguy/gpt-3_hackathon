import React from 'react';

import contextTypes from '../../contextTypes';

export default class Link extends React.Component {

  static contextTypes = contextTypes;

  constructor(props, context) {
    super(props, context);

    const router = this.context.router;
    let route, path;

    if (props.href) {
      path = props.href;
      route = router.getRoute(props.href);
    } else if (props.route) {
      path = router.makePath(props.route, props.params);
      route = router.getRoute(path);
    }

    this.state = {
      route: route,
      href: path
    };
  }

  handleClick = (event) => {
    if (this.state.route) {
      event.preventDefault();
      const oldUrl = this.context.getStore('NavigationStore').getState().url; // store initial url
      this.context.getActions('NavigationActions').navigate(this.state.route.url)
    }
  }

  render() {
    return (
      <a style={styles.link} onClick={this.handleClick} href={this.state.href} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}

const styles = {
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}
