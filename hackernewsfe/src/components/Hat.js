import React from 'react';

class Hat extends React.Component {
    RoutChange = () => {
        this.props.onRouteChange('signin');
    }
    render() {
        return (
            <div>
                <div className="fl w-90 pa2"></div>
                <div className="fl w-10 pa2"><a href='' className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green grow shadow-3" onClick={this.RoutChange}> Log Out</a></div>
            </div>

        );
    }
}


export default Hat;