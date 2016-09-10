import React from "react";
import Radium from "radium";

import GoogleMap from "google-map-react";
import Root, { pageInit } from "~/shared/components/Root";
import Navbar from "~/shared/components/navbar/Navbar";
import Leftbar from "~/map/components/Leftbar";

@Radium
class Map extends React.Component {

    render() {
        return (
            <Root pageName="map">
                <Navbar />
                <Leftbar />
                <GoogleMap
                    center={[39.9583086, -98.3331244]}
                    zoom={4}
                />
            </Root>
        )
    }

}

pageInit(Map);
