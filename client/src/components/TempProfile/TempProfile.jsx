import React, { Component } from 'react';

class TempProfile extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};

        this.authorize = this.authorize.bind(this);
        if (!this.props.user.spotifyData || !this.props.user.spotifyData.fetched) {
            this.authorize();
        }
    }

    authorize() {
        var regex = RegExp(/code=([^&]*)/).exec(window.location.href);
        if (regex) {
            var code = regex[1];
            this.props.authorize(code);
        }
    }

    render() {
        var isValid = true;
        if (!this.props.user.spotifyData || this.props.user.spotifyData.error == 'invalid_token') {
            isValid = false;
        }
        return (
            <div>
                {isValid && <div>
                    <h3>User logged in</h3>
                    <div>Name: {this.props.user.spotifyData.display_name}</div>  
                    <div>Email: {this.props.user.spotifyData.email}</div>
                    <code>
                        {JSON.stringify(this.props.user.spotifyData)}
                    </code>
                </div>}
            </div>
        )
    }
}

export default TempProfile;