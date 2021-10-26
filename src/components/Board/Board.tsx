import { Grid } from '@mui/material';
import React from 'react';
import { Observable, of, take } from 'rxjs';
import Tile from '../Tile/Tile';
import './Board.scss';

interface IBoardState {
    categories: Array<any>;
}
class Board extends React.Component<{}, IBoardState> {
    constructor(props: any) {
        super(props);
        this.state = { categories: [] };
    }

    private getHeaders(): Observable<any> {
        return new Observable(obs => {
            fetch(`http://jservice.io/api/categories?count=6&offset=${Math.floor((Math.random() * 2500) + 1)}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    obs.next(data);
                    obs.complete();
                })
                .catch(err => obs.error(err));
        });            
    }

    componentDidMount() {
        let categories: Array<any> = []

        this.getHeaders()
            .subscribe({
                next: (res: any) => {
                    console.log('res: ', res);
                    res.map((item: any) => {
                        categories.push(
                            <Grid item xs={2}>
                                <Tile isHeader="true" title={item.title} key={item.id} />
                            </Grid>
                        );
                    });

                    this.setState({ categories });
                },
                error: (err) => {
                    console.error(err);
                }
            });
    }

    render() {
        console.log('categories: ', this.state);
        return (
            <div className="board-container">
                <Grid container>
                    {this.state.categories}
                </Grid>
            </div>
        );
    }
    
}

export default Board;