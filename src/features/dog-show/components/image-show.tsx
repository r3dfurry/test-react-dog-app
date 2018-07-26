import * as React from 'react';
import { IBreed } from '../model';
import * as _ from 'lodash';

interface IProps {
    imageLink: string;
    breed: IBreed
}

class ImageShow extends React.Component<IProps, any> {
    public render() {
        return (
            (!!this.props.imageLink) ?
            <div className="ui card">
                <div className="image">
                    <img src={this.props.imageLink} alt={this.props.breed.name} />
                </div>
                <div className="content">
                    <a className="header">
                        {_.startCase(this.props.breed.name)} {(this.props.breed.selectedSub) ? ' (' + _.startCase(this.props.breed.selectedSub) + ')' : null}
                    </a>
                {(this.props.breed.sub.length > 0) ?
                    <div className="meta">
                        <span className="date">Have {this.props.breed.sub.length.toString()} subbreeds</span>
                    </div>
                : null}
                {(this.props.breed.sub.length > 0) ?
                    <div className="description">
                        List of subbreeds: {this.props.breed.sub.map(b => _.startCase(b)).join(', ')}
                    </div>
                : null}
                </div>
            </div> : null
        )
    }
}

export default ImageShow;