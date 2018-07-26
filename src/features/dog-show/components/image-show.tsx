import * as React from 'react';

interface IProps {
    imageLink: string;
    breed: string
}

class ImageShow extends React.Component<IProps, any> {
    public render() {
        return (
            <div>
                <img src={this.props.imageLink} alt={this.props.breed} />
            </div>
        )
    }
}

export default ImageShow;