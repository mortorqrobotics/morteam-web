import React from "react";
import Radium from "radium";

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
            </Root>
        )
    }

}

pageInit(Map);
