import React from "react";
import Radium from "radium";

import GoogleMap from "google-map-react";
import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/map/components/Leftbar";
import config from "~/../config.json";

const currentTeam = teamLocations[window.__userInfo.team.number];
const mapOptions = {
    zoom: currentTeam ? 15 : 4,
    center: currentTeam ? {lat: currentTeam.longitude, lng: currentTeam.latitude}
        : {lat: 39.9583086, lng: -98.3331244}
}

@Radium
class Map extends React.Component {

    render() {
        return (
            <Root pageName="map">
                <Navbar />
                <Leftbar />
                <GoogleMap
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}
                    bootstrapURLKeys={{
                        key: config.mapsKey,
                    }}
                >
                    {Object.keys(teamLocations).map(teamNum => (
                        // yes they are switched
                        <div
                            key={teamNum}
                            lat={teamLocations[teamNum].longitude}
                            lng={teamLocations[teamNum].latitude}
                        >
                            {teamNum}
                        </div>
                    ))}
                </GoogleMap>
            </Root>
        )
    }

}

pageInit(Map);
