import * as React from 'react';
import { IBreed } from '../model';

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
                    <a className="header">{this.props.breed.name}</a>
                </div>
            </div> : null
        )
    }
}

export default ImageShow;