import React from "react";

interface IsolateProps {
    children: React.ReactNode;
}

export default class Isolate extends React.Component<IsolateProps> {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
