import * as React from 'react';

export interface AwooMeterProps {
    /**
     * Handler for when the slider is moved. Argument is a number in the range 0, 1.
     */
    onInput?: (intensity: number) => void;
}

export class AwooMeter extends React.Component<AwooMeterProps> {
    constructor(props: any) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }

    private handleInput(event: React.FormEvent<HTMLInputElement>) {
        if( this.props.onInput ) {
            let intensity = parseFloat(event.currentTarget.value);
            this.props.onInput(intensity);
        }
    }

    render() {
        return (
            <div id="awoo-meter">
                <h2>Awoo Meter</h2>
                <div id="awoo-meter-slider-container">
                    <span>Less awoo</span>
                    <input id="awoo-meter-slider" type="range" min="0" max="1" step="0.01" defaultValue="0"
                        onInput={this.handleInput} />
                    <span>More awoo</span>
                </div>
            </div>
        );
    }
}