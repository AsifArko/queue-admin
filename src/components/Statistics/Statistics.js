import React from "react";
import {Card, Menu} from "semantic-ui-react";
import {connect} from "react-redux";

import utils from "../../utils/utils";
import {loadData} from "../../utils/ActionCreators";
import {contentType} from "../../utils/ActionTypes";
import {getStatisticsApiPath} from "../../utils/routerUtils";

class QueueStatistics extends React.Component {
    componentDidMount() {
        this.fetchStatistics();
        setInterval(()=>{
            this.fetchStatistics()
        },2000)
    }

    fetchStatistics() {
        const {onLoadData} = this.props;
        onLoadData(
            null,
            getStatisticsApiPath,
            contentType.STATISTICS
        )
    }

    render() {
        const {data} = this.props;
        let statuses = ["Active", "Completed", "Waiting", "Delayed", "Failed", "Stalled"];

        let cards = statuses.map(status => {
            let count = 0;
            if (data !== null) {
                switch (status) {
                    case "Active":
                        count = data.active;
                        break;
                    case "Completed":
                        count = data.completed;
                        break;
                    case "Waiting":
                        count = data.waiting;
                        break;
                    case "Delayed":
                        count = data.delayed;
                        break;
                    case "Failed":
                        count = data.failed;
                        break;
                    case "Stalled":
                        count = data.paused;
                        break;
                    default:
                        count = 0;
                        break;
                }

            }
            return (
                <Menu.Item key={status}>
                    <Card>
                        <Card.Content header={status}/>
                        <Card.Content extra>
                            Total : {count}
                        </Card.Content>
                    </Card>
                </Menu.Item>
            )
        });

        return (
            <div style={{padding: '10px'}}>
                <Menu borderless={true} compact={true}>
                    {cards}
                </Menu>
            </div>
        )
    }
}

const mapActionToProps = {
    onLoadData: loadData
};

const mapStateToProps = state => {
    const {statisticsRemoteData} = state;
    return {
        data: utils.getData(statisticsRemoteData),
        isFetching: utils.getIsFetching(statisticsRemoteData)
    };
};

export default connect(mapStateToProps, mapActionToProps)(QueueStatistics);