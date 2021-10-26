import { Typography } from '@mui/material';
import React from 'react';
import './Tile.scss';

export interface ITile {
    isHeader: boolean;
    title: string;
}

class Tile extends React.Component<ITile> {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div className={this.props.isHeader ? "header" : "tile"}>
                <Typography>{this.props.title}</Typography>
            </div> 
        )
    }
}

export default Tile;