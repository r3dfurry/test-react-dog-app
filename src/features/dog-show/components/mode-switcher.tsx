import * as React from 'react';
import { IBreed } from '../model';

interface IProps {
    breeds: IBreed[],
    selectedBreed: IBreed,
    showRandomBreedClick: () => void,
    showSpecificBreedClick: (breed: IBreed[]) => void
}

export class ModeSwitcher extends React.Component<IProps, any>{

    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <div>
                <div>
                    <button className="ui labeled icon button" onClick={this.props.showRandomBreedClick}>
                        <i className="random icon"/>
                        Show random breed
                    </button>
                    <span>or <br/>specify breed</span>
                    <select className="ui dropdown" value={this.props.selectedBreed.name}
                        onChange={e => this.props.showSpecificBreedClick(
                            this.props.breeds.filter((breed: IBreed) => breed.name === e.target.value)
                        )}>
                        {this.props.breeds.map(
                            (breed: IBreed) => {
                                return (
                                    <option
                                        key={breed.name}
                                        value={breed.name}
                                    >{breed.name}</option>
                                );
                            }
                        )}
                    </select>
                    {(!!this.props.selectedBreed) ?
                            <button className="ui right labeled icon button" onClick={e => this.props.showSpecificBreedClick(
                                this.props.breeds.filter((breed: IBreed) => breed.name === this.props.selectedBreed.name)
                            )}>
                                <i className="right redo icon" />
                                One more {this.props.selectedBreed.name}
                            </button> : null}
                </div>
            </div>
        );
    }
}