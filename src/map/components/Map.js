import React from "react";
import Radium from "radium";

import GoogleMap from "google-map-react";
import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/map/components/Leftbar";
import config from "~/../config.json";

const currentTeamNum = window.__userInfo.team.number;

@Radium
class Map extends React.Component {

    render() {

        return (
            <Root pageName="map">
                <Navbar />
                <Leftbar />
                <GoogleMap
                    center={{
                        lat: teamLocations[currentTeamNum].longitude,
                        lng: teamLocations[currentTeamNum].latitude
                    }}
                    zoom={15}
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
