import React from "react";
import Radium from "radium";

import GoogleMap from "google-map-react";
import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/map/components/Leftbar";
import config from "~/../config.json";

@Radium
class Map extends React.Component {

    render() {
                console.log("A")
        return (
            <Root pageName="map">
                <Navbar />
                <Leftbar />
                <GoogleMap
                    center={[39.9583086, -98.3331244]}
                    zoom={4}
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
