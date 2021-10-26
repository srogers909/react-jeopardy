import { Grid } from '@mui/material';
import React from 'react';
import { Observable, take } from 'rxjs';
import Tile from '../Tile/Tile';
import './Board.scss';

interface IBoardState {
    categories: Array<JSX.Element>;
}

interface ICategory {
    id: number;
    title: string;
    clues_count: number;
}
class Board extends React.Component<{}, IBoardState> {
    constructor(props: any) {
        super(props);
        this.state = { categories: [] };
    }

    private getHeaders(): Observable<Array<ICategory>> {
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
        let categories: Array<JSX.Element> = [];

        this.getHeaders()
            .pipe(take(1))
            .subscribe({
                next: (res: Array<ICategory>) => {
                    res.map((item: ICategory) => {
                        categories.push(
                            <Grid item xs={2} alignItems="center" justifyContent="center" direction="column">
                                <Tile isHeader={true} title={item.title} key={item.id} />
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
        return (
            <div className="board-container">
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center">
                    {this.state.categories}
                </Grid>
            </div>
        );
    }    
}

export default Board;