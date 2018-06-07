import React, { Children, Component, ReactChild } from 'react';

/**
 * Refs don't work on SFC
 * ReactDOM.findDOMNode(wrapperRef) effectively returns a ref to the stateless component
 */

interface IRefWrapperProps {
  children: ReactChild | ReactChild[];
}

class RefWrapper extends Component<IRefWrapperProps, any> {
  public render(): JSX.Element {
    return Children.only(this.props.children);
  }
}

export { RefWrapper, IRefWrapperProps };