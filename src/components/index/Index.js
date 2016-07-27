import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/components/shared/Root";
import Leftbar from "./leftbar/Leftbar";
import AnnouncementsList from "./announcements/AnnouncementsList";

@Radium
export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <div>
                    <AnnouncementsList />
                    <Leftbar />
                </div>
            </Root>
        )
    }
}

pageInit(Index);
