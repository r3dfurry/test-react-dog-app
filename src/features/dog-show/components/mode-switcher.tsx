import * as Immutable from 'immutable';
import * as React from 'react';

interface IProps {
    breeds: Immutable.List<string>,
    selectedBreed: string,
    showRandomBreedClick: () => void,
    showSpecificBreedClick: (breed: string) => void
}

export class ModeSwitcher extends React.Component<IProps, any>{

    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <div>
                <div>
                    <button onClick={this.props.showRandomBreedClick}>Show any</button>
                </div>
                <div>
                    <select value={this.props.selectedBreed}
                        onChange={e => this.props.showSpecificBreedClick(e.target.value)}>
                        {this.props.breeds.map(
                            breed => {
                                return (
                                    <option
                                        key={breed}
                                        value={breed}
                                    >{breed}</option>
                                );
                            }
                        )}
                    </select>
                    <button onClick={e => this.props.showSpecificBreedClick(this.props.selectedBreed)}>One more</button>
                </div>
            </div>
        );
    }
}