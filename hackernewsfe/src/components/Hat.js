import React from 'react';

class Hat extends React.Component {
    RoutChange = () => {
        this.props.onRouteChange('signin');
    }
    render() {
        return (
            <div>
                <a href='' className="tr fl w-100 pr3 link dim dark-green" onClick={this.RoutChange}> Log Out</a>
            </div>

        );
    }
}


export default Hat;