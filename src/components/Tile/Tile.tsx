import { Typography } from '@mui/material';
import './Tile.scss';

function Tile(props: any): JSX.Element {
    console.log('props: ', props);

    return (
        <Typography>
            <div className={props.isHeader ? "header" : "tile"}>
                <p>{props.title}</p>
            </div>
        </Typography>
        
    )
}

export default Tile;